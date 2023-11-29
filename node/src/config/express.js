const express= require("express");
const app= express();
const session = require('express-session');

const bodyParser= require("body-parser");
const expressLayout= require("express-ejs-layouts");
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(expressLayout);
app.use(express.static("views"));

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.use(bodyParser.json())

app.use(
    session({
      secret: 'BD23532',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false }
    })
  );

const rotas= require("../app/rotas/rotas");
rotas(app);

module.exports= app;