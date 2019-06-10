const http = require("http");
const express = require("express");
const path = require('path')
const mysql = require('mysql')
const app = express();
var root = {root: './..'};
var servidor = http.createServer(app);
var favicon = require('serve-favicon');

app.use(express.static(path.resolve(".","../public")));
app.use(favicon(path.resolve(__dirname,"../public/images/favicon.ico")));

//função pra o host local
servidor.listen(3000,console.log('Servidor rodando no host local'));
//função pra rede local
app.listen(3000,'172.16.8.135', function() {
	console.log('Servidor rodando na rede local', root)
});

app.get("/", function(req,res){
    console.log("Recebendo requisição de índice");
    res.sendFile('/client/index.html', root);
});

app.get("/cadastro", function(req,res){
    console.log("Recebendo requisição de cadastro")
    res.sendFile('/client/cadastro.html', root);
});

app.get("/login", function(req,res){
    console.log("Recebendo requisição de login")
    res.sendFile('/client/login.html', root);
});
app.get('/cadastro-finalizado', (request, response) => {
    console.log('Recebendo a requisição de cadastro!')
    
    var email = request.query.email.toString()
    var senha = request.query.senha
    var nome = request.query.nome
    var receberInfor = 'no'
    

    // Banco de Dados
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'admin',
      database : 'cadastro'
    });
    
    connection.connect();


    var sql = `INSERT INTO usuario (email, senha, nome, enviarInfor) VALUES ('${email}', '${senha}', '${nome}', '${receberInfor}');`; 

    connection.query(sql, function (error, results, fields) {
      if (error) {
        console.log(sql)
        console.log(error)
        connection.end();
        response.send('Não foi possível realizar o cadastro!'); 
      } else {
        connection.end();
        response.sendFile('/client/cadastro-finalizado.html', root);
      }
    });
    
})
