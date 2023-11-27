module.exports = (app) => 
{
  app.use((req,res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });

  const locbusController = require("../controllers/CON_Usuario");
  const lbController = new locbusController();

  app.get("/login", (req, res) =>{
    console.log("Abrindo página de login...")
    res.render('./HTML_CSS/login')
  })

  app.get("/cadastre-se", (req, res)=>{
    console.log("Abrindo página de cadastro...")
    res.render('./HTML_CSS/register') 
  })

  app.get('/suporte', (req, res) => {
    console.log('Abrindo página de suporte...');
    res.render('./HTML_CSS/support', {user: req.session.user})
  })

  app.get('/consultaItinerarios', (req, res) => {
    console.log('Abrindo página de consulta de itinerários...');
    res.render('./HTML_CSS/consultaItinerario')
  })

  app.get('/sobre-nos', (req, res) => {
    console.log('Abrindo página sobre nós...');
    res.render('./HTML_CSS/about-us', {user: req.session.user})
  })
  
  app.get('/horarios', (req, res) => {
    console.log('Abrindo página de seleção de horários...');
    res.render('./HTML_CSS/consultaHorarios')
  })
  
  app.get("/home", lbController.getPontosEJS())

  app.post("/home", lbController.getPontosEJS_viaLogin())
  
  app.post("/cadastrarUsuario", lbController.cadastroUsuario())

  app.get('/horariosPonto', lbController.exibeView())

  app.post('/exibeHorario', lbController.exibeHorarios_ReqBody());

  app.get('/horariosLinha/:idLinha', lbController.exibeHorarios());

  app.post("/exibeItinerario", lbController.exibeItinerarioMapa())

  app.get('/consultaDados/:idUser', lbController.selecionaAlterarDados())

  app.post("/alterarDados", lbController.AlterarDados())

} 
