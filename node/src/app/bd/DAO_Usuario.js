class DAO_Usuario{
    constructor(bd){
        this._bd= bd;
    }

    login(email, password){
      return new Promise((resolve, reject) =>{
        const sql= 'select email, senha from lb_usuario where email=? and senha=?'
        this._bd.query(sql, [email, password], (erro, recordset) =>{
          if (erro) {
            console.log(erro);
            return reject("Falha ao fazer login...");
          }
          resolve(recordset);
        })
      })
    }

    selectUsuario(email, senha) {
      return new Promise((resolve, reject) => {
        const sql = 'SELECT nome, sobrenome, cpf, email, linhaPreferida FROM lb_usuario WHERE email=? AND senha=?';
        this._bd.query(sql, [email, senha], (erro, recordset) => {
          if (erro) {
            console.log(erro);
            return reject("Dados não correspondem com os do BD");
          }
          console.log('Resultado da consulta:', recordset);
    
          if (recordset.length >= 1) {
            const usuario = {
              nome: recordset[0].nome,
              sobrenome: recordset[0].sobrenome,
              cpf: recordset[0].cpf,
              email: recordset[0].email,
              linhaPreferida: recordset[0].linhaPreferida
            };
    
            const sqlLinhaPreferida = 'SELECT idLinha, nomeIda, nomeVolta FROM lb_Linhas WHERE idLinha=?';
            this._bd.query(sqlLinhaPreferida, [usuario.linhaPreferida], (erroLinhaPreferida, recordsetLinhaPreferida) => {
              if (erroLinhaPreferida) {
                console.log(erroLinhaPreferida);
                reject("Erro ao obter informações da linha preferida");
              } else {
                usuario.linhaPreferidaInfo = recordsetLinhaPreferida[0];
                resolve(usuario);
                console.log(usuario.linhaPreferidaInfo)
              }
            });
          } else {
            reject("Usuário não encontrado");
          }
        });
      });
    }
    
    
    incluirDadosEJS(nome, sobrenome, cpf, email, senha, linhaPreferida) {
          return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO lb_Usuario (nome, sobrenome, cpf, email, senha, linhaPreferida) VALUES (?, ?, ?, ?, ?, ?)';
            this._bd.query(sql, [nome, sobrenome, cpf, email, senha, linhaPreferida], (erro, recordset) => {
              if (erro) {
                console.log(erro);
                return reject("Inserção de Cliente falhou");
              }
              resolve(recordset);
            });
          });
    };


    getPontosPeloID(ids) {
          return new Promise((resolve, reject) => {
              const sql = `SELECT idPonto, logradouro, lat, lon FROM lb_Pontos order by idPonto`;

              this._bd.query(sql, [ids], (erro, recordset) => {
                  if (erro) {
                      console.log(erro);
                      return reject("Get Pontos falhou");
                  }
                  resolve(recordset);
              });
          });
    }

    selectView(idPonto) {
        return new Promise((resolve, reject) => {
            const viewName = `lb_v_ponto${idPonto}`;
            const sql = `SELECT idLinha, sentidoLinha, horarioTabela FROM ${viewName}`;

            this._bd.query(sql, [idPonto], (erro, recordset) => {
                if (erro) {
                    console.log(erro);
                    return reject("Select falhou");
                }
                resolve(recordset);
            });
        });
    }
    
    selectHorarios(idLinha) {
      return new Promise((resolve, reject) => {
        const sql= `SELECT
                        h.dia,
                        h.horario,
                        h.idLinha,
                        CASE
                            WHEN h.sentido = 'ida' THEN l.nomeIda
                            WHEN h.sentido = 'volta' THEN l.nomeVolta
                        END AS sentido_nome
                    FROM
                        lb_Horarios_Partida h
                    JOIN
                        lb_Linhas l ON h.idLinha = l.idLinha
                    WHERE
                        h.idLinha = ?;`
      // const sql = `SELECT sentido, dia, horario FROM lb_Horarios_Partida WHERE idLinha=?`;
        this._bd.query(sql, [idLinha], (erro, recordset) => {
          if (erro) {
            console.log(erro);
            return reject("Select falhou");
          }
          resolve(recordset);
        });
      });
    }

    select_itinerariosPorLinha(idLinha, sentido){
      return new Promise((resolve, reject) =>{
        const sql= `SELECT
                        i.idLinha,
                        i.idPonto,
                        i.logradouro,
                        CASE
                            WHEN i.sentido = 'ida' THEN l.nomeIda
                            WHEN i.sentido = 'volta' THEN l.nomeVolta
                        END AS sentido_nome
                    FROM
                        lb_Itinerario i
                    JOIN lb_Linhas l ON i.idLinha = l.idLinha
                    WHERE
                        i.idLinha = ? AND i.sentido = ?
                    ORDER BY
                        i.sequencia;`
        this._bd.query(sql, [idLinha, sentido], (erro, recordset) =>{
          if(erro) {
            console.log(erro);
            return reject("Select falhou");
          }
          resolve(recordset);
        })
      })
    }

    getPontosPorLinhaSentido(idLinha, sentido) {
      return new Promise((resolve, reject) => {
          const sql = ` SELECT p.idPonto, p.logradouro, p.lat, p.lon
                        FROM lb_Pontos p
                        JOIN lb_Itinerario i ON p.idPonto = i.idPonto
                        WHERE i.idLinha = ? AND i.sentido = ?
                        ORDER BY i.sequencia`;

          this._bd.query(sql, [idLinha, sentido], (erro, recordset) => {
              if (erro) {
                  console.log(erro);
                  return reject("Get Pontos por Linha e Sentido falhou");
              }
              resolve(recordset);
          });
      });
    }
  
};

module.exports= DAO_Usuario;