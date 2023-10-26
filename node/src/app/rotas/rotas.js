module.exports = (app) => 
{
  app.use((req,res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });

  const usuariosController = require("../controllers/CON_Usuario");
  const userController = new usuariosController();

  app.get("/cadastro", (req,res) => {
    console.log("Abrindo Formulário...");
    res.render("cadastro");
  });

  app.post("/inclusaoNovoCliente",userController.executaIncluirEJS());

} 
