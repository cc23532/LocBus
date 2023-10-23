class DAO_Usuario{
    constructor(bd){
        this._bd= bd;
    }

    incluirDadosEJS(nome, sobrenome, cpf, email, password) {
        return new Promise((resolve, reject) => {
          const sql = 'INSERT INTO locbus.Usuario (nome, sobrenome, cpf, email, senha) VALUES (?, ?, ?, ?)';
          this._bd.query(sql, [nome, sobrenome, cpf, email, password], (erro, recordset) => {
            if (erro) {
              console.log(erro);
              return reject("Inserção de Cliente falhou");
            }
            resolve(recordset);
          });
        });
      };
};

module.exports= DAO_Usuario;