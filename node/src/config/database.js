const mssql= require("mssql");

const config= {
    server: 'regulus.cotuca.unicamp.br',
    user: 'BD23532',
    password: 'BD23532',
    database: 'BD23532',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

mssql.connect(config)
    .then(pool => {
        console.log("Conexão com o banco de dados bem-sucedida");
    })
    .catch(err => {
        console.error("Erro ao conectar ao banco de dados: " + err.message);
    });

module.exports= mssql;

