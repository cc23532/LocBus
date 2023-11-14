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
      const sql = `SELECT sentido, dia, horario FROM lb_Horarios_Partida WHERE idLinha=?`;
      this._bd.query(sql, [idLinha], (erro, recordset) => {
        if (erro) {
          console.log(erro);
          return reject("Select falhou");
        }
        resolve(recordset);
      });
    });
  }
  
  
};

module.exports= DAO_Usuario;