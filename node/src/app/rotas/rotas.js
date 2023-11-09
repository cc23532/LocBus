module.exports = (app, mssql) => 
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
 app.get('/mapa', lbController.getPontosEJS());

 app.post("/verificaLogin", lbController.verificaLogin())
 app.post("/cadastrarUsuario", lbController.cadastroUsuario())


} 
