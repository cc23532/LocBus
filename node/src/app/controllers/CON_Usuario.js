const bd = require("../../config/database");
const locbusDAO = require("../bd/DAO_Usuario");

class CON_Usuario 
{
  getPontosEJS_viaLogin() {
    return async function(req, res) {
      const lbDAO = new locbusDAO(bd);
      const pontoIDs = Array.from({ length: 199 }, (_, index) => index + 1);
      try {
        const { email, senha } = req.body;
        const recordset = await lbDAO.login(email, senha);
        
        if (recordset.length === 1) {
          const userData = await lbDAO.selectUsuario(email, senha);
          req.session.user = {
            idUser: userData.idUser,
            nome: userData.nome,
            sobrenome: userData.sobrenome,
            cpf: userData.cpf,
            email: userData.email,
            linhaPreferida: userData.linhaPreferida,
            linhaPreferidaInfo: userData.linhaPreferidaInfo

          };
  
          const pontosDesejados = await lbDAO.getPontosPeloID(pontoIDs);
  
          res.render('mapa', { user: req.session.user, pontos: pontosDesejados });
          console.log(req.session.user);
        } else {
          console.log("Nenhum registro encontrado ou mais de um registro encontrado.");
          throw new Error("Falha ao efetuar login");
        }
      } catch (error) {
        console.error('Erro na obtenção de dados do servidor:', error);
        res.status(500).json({ error: 'Erro na obtenção de dados do servidor' });
      }
    };
  }
  
  getPontosEJS(){
    return async function(req, res){
      const lbDAO = new locbusDAO(bd);
      const pontoIDs = Array.from({ length: 199 }, (_, index) => index + 1);
      try {
          const pontosDesejados = await lbDAO.getPontosPeloID(pontoIDs);
          res.render('mapa', { pontos: pontosDesejados, user: req.session.user});
          console.log(pontosDesejados) // Renderize a página EJS com os dados
      } catch (error) {
          console.error('Erro na obtenção de dados do servidor:', error);
          res.status(500).json({ error: 'Erro na obtenção de dados do servidor' });
      }
    }
  }

  cadastroUsuario(){
    return function(req, res){
      const lbDAO= new locbusDAO(bd)
      const { nome, sobrenome, cpf, email, senha, linhaPreferida }= req.body
      const linhaPreferidaValue = (linhaPreferida === "") ? null : parseInt(linhaPreferida);
      lbDAO.incluirDadosEJS(nome, sobrenome, cpf, email, senha, linhaPreferidaValue)
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

  selecionaAlterarDados(){
    return function (req, res){
      const lbDAO= new locbusDAO(bd)
      const idUser= req.params.idUser
      const { nome, sobrenome, cpf, email, senha, linhaPreferida }= req.body
      lbDAO.catchDadosParaUpdate(nome, sobrenome, cpf, email, senha, linhaPreferida,idUser)
      .then(() =>{
        console.log("Abrindo página de dados do Usuário " + idUser+ "...")
        res.render('./HTML_CSS/alterarDadosUsuario', {user: req.session.user})
      })
      .catch((error) => {
        console.error('Erro na obtenção de dados do servidor:', error);
        res.status(500).json({ error: 'Erro na obtenção de dados do servidor' });
      })
    }
  }

  AlterarDados() {
    const self = this;
  
    return function (req, res) {
      const lbDAO = new locbusDAO(bd);
      const idUser = req.body.idUser;
      const nome = req.body.nome;
      const sobrenome = req.body.sobrenome;
      const cpf = req.body.cpf;
      const email = req.body.email;
      const linhaPreferida = req.body.linhaPreferida;
  
      lbDAO.updateUsuario(nome, sobrenome, cpf, email, linhaPreferida, idUser)
        .then((resultado) => {
          console.log("Alterando dados do Usuário " + idUser + "...");
          
          // Verificar se a linha preferida foi atualizada com sucesso
          const linhaPreferidaInfo = resultado.linhaPreferidaInfo;
  
          // Atualizar req.session.user com os dados atualizados
          req.session.user = {
            ...req.session.user,
            nome: resultado.nome,
            sobrenome: resultado.sobrenome,
            cpf: resultado.cpf,
            email: resultado.email,
            linhaPreferida: resultado.linhaPreferida,
            linhaPreferidaInfo: linhaPreferidaInfo  // Adicione as informações da linha preferida
            // Adicione outras propriedades conforme necessário
          };
  
          // Chamar getPontosEJS no contexto da instância atual
          self.getPontosEJS()(req, res);
        })
        .catch((error) => {
          console.error('Erro ao alterar dados do servidor:', error);
          res.status(500).json({ error: 'Erro ao alterar dados do servidor' });
        });
    };
  }
  

  exibeView(){
    return function (req, res){
      const lbDAO= new locbusDAO(bd)
      const idPonto= req.query.idPonto
      lbDAO.selectView(idPonto)
      .then((horariosPonto) =>{
        console.log("Abrindo página de horários do ponto " + idPonto+ "...")
        res.render('./HTML_CSS/horariosPonto', {idPonto: idPonto, horariosPonto: horariosPonto, user: req.session.user})
        console.log(req.session.user);

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
        res.render('./HTML_CSS/horariosLinha', {idLinha: idLinha, horariosLinha: horariosLinha, user: req.session.user})
      })
      .catch((error) => {
        console.error('Erro na obtenção de dados do servidor:', error);
        res.status(500).json({ error: 'Erro na obtenção de dados do servidor' });
      })
    }
  }

  exibeHorarios_ReqBody(){
    return function (req, res){
      const lbDAO= new locbusDAO(bd)
      const idLinha= req.body.idLinha
      lbDAO.selectHorarios(idLinha)
      .then((horariosLinha) =>{
        console.log("Abrindo página de horários da Linha " + idLinha+ "...")
        res.render('./HTML_CSS/horariosLinha', {idLinha: idLinha, horariosLinha: horariosLinha, user: req.session.user})
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


            res.render('./HTML_CSS/itinerarioLinha', { idLinha: idLinha, itinerarioLinha: itinerarioLinha, pontos: pontosDesejados, user: req.session.user });
        } catch (error) {
            console.error('Erro na obtenção de dados do servidor:', error);
            res.status(500).json({ error: 'Erro na obtenção de dados do servidor' });
        }
    };
}

}
module.exports = CON_Usuario;

