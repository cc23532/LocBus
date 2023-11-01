module.exports = (app, mssql) => 
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

  app.get('/get-pontos', (req, res) => {
    const request = new mssql.Request();
  
    const query = 'SELECT idPonto, logradouro, lat, long FROM locbus.Pontos';
  
    request.query(query)
      .then((recordset) => {
        res.json(recordset.recordset);
      })
      .catch((err) => {
        console.error('Erro na consulta SQL:', err);
        res.status(500).json({ error: 'Erro na consulta SQL' });
      });
  });
  

  app.get("/mapa", (req,res) => {
    console.log("Abrindo mapa...");
    res.render("mapa")
  });

  app.post("/inclusaoNovoCliente",userController.executaIncluirEJS());

} 
