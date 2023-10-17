const mySQL= require("mysql2");

const connection= mySQL.createConnection({
    host: 'regulus.cotuca.unicamp.br',
    user: 'BD23532',
    password: 'BD23532',
    database: 'BD23532'
});

connection.connect(function(erro) {
    if(erro){
        console.log("ERRO na conexão com o BD23532");
    }
    else{
        console.log("Conexão com o BD23532 BEM-SUCEDIDA");
    }
});

module.exports= connection;