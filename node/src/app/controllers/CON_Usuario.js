const bd = require("../../config/database");
const locbusDAO = require("../bd/DAO_Usuario");

class CON_Usuario 
{
  verificaLogin(){
    return function (req, res){
      const lbDAO = new locbusDAO(bd);
      const { email, senha } = req.body;
      lbDAO.login(email, senha)
      .then(() =>{
        console.log("login efetuado com sucesso!")
        res.send("login efetuado com sucesso!")
      })
      .catch((erro) => {
        console.log(erro);
        res.send("Falha ao efetuar login");
      });
    }
  }

  cadastroUsuario(){
    return function(req, res){
      const lbDAO= new locbusDAO(bd)
      const { nome, sobrenome, cpf, email, senha, linhaPreferida }= req.body
      lbDAO.incluirDadosEJS(nome, sobrenome, cpf, email, senha, linhaPreferida)
      .then(() =>{
        console.log("Usuario cadastrado com sucesso!")
        res.send("Usuario cadastrado com sucesso!")
      })
      .catch((erro) => {
        console.log(erro);
        res.send("Falha ao cadastrar usuario");
      });
    }
  }

  getPontosEJS() {
    return async function(req, res){
      const lbDAO = new locbusDAO(bd);
      const pontoIDs = Array.from({ length: 199 }, (_, index) => index + 1);

      try {
          const pontosDesejados = await lbDAO.getPontosPeloID(pontoIDs);
          res.render('mapa', { pontos: pontosDesejados });
          console.log(pontosDesejados) // Renderize a página EJS com os dados
      } catch (error) {
          console.error('Erro na obtenção de dados do servidor:', error);
          res.status(500).json({ error: 'Erro na obtenção de dados do servidor' });
      }
    }
  }

  exibeView(){
    return function (req, res){
      const lbDAO= new locbusDAO(bd)
      const idPonto= req.query.idPonto
      lbDAO.selectView(idPonto)
      .then((horariosPonto) =>{
        console.log("Abrindo página de horários do ponto " + idPonto+ "...")
        res.render('./HTML_CSS/horariosPonto', {idPonto: idPonto, horariosPonto: horariosPonto})
      })
      .catch((error) => {
        console.error('Erro na obtenção de dados do servidor:', error);
        res.status(500).json({ error: 'Erro na obtenção de dados do servidor' });
    });
    }
  }

  exibeHorarios(){
    return function (req, res){
      const lbDAO= new locbusDAO(bd)
      const idLinha= req.params.idLinha
      lbDAO.selectHorarios(idLinha)
      .then((horariosLinha) =>{
        console.log("Abrindo página de horários da Linha " + idLinha+ "...")
        res.render('./HTML_CSS/horariosLinha', {idLinha: idLinha, horariosLinha: horariosLinha})
      })
      .catch((error) => {
        console.error('Erro na obtenção de dados do servidor:', error);
        res.status(500).json({ error: 'Erro na obtenção de dados do servidor' });
      })
    }
  }

  exibeItinerarioMapa() {
    return async function (req, res) {
        const lbDAO = new locbusDAO(bd);
        const idLinha = req.body.idLinha;
        const sentido = req.body.sentido;

        try {
                const [itinerarioLinha, pontosDesejados] = await Promise.all([
                lbDAO.select_itinerariosPorLinha(idLinha, sentido),
                lbDAO.getPontosPorLinhaSentido(idLinha, sentido)
            ]);

            console.log("Abrindo página de itinerários da Linha " + idLinha + " sentido " + sentido + "...");
            console.log(pontosDesejados) // Renderize a página EJS com os dados


            res.render('./HTML_CSS/itinerarioLinha', { idLinha: idLinha, itinerarioLinha: itinerarioLinha, pontos: pontosDesejados });
        } catch (error) {
            console.error('Erro na obtenção de dados do servidor:', error);
            res.status(500).json({ error: 'Erro na obtenção de dados do servidor' });
        }
    };
}

}
module.exports = CON_Usuario;

