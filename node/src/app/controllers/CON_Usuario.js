const bd = require("../../config/database");
const usuarioDAO = require("../bd/DAO_Usuario");

class CON_Usuario 
{
  executaIncluirEJS() 
  {
    return function(req,res) {
      const userDAO = new usuarioDAO(bd);
      const { nome, sobrenome, cpf, email, password } = req.body;

      userDAO.incluirDadosEJS(nome, sobrenome, cpf, email, password)
        .then(() => {
          console.log("Cadastro realizado com sucesso!");
          res.send("Cadastro realizado com sucesso!");
        })
        .catch((erro) => {
          console.log(erro);
          res.send("Falha ao Inserir os Dados");
        });
      };
    };

  } // end da classe

module.exports = CON_Usuario;

