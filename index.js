// toda vez que se cria uma sessão para o usuario é gerada uma nova chave pra ele

const express = require('express'); 
const session = require('express-session'); // sessao que manipula no php
const bodyParser = require('body-parser'); // interagir com o q vem do formulario

const port = 3000;
var path = require('path'); //setar o driretorio das views
const app = express();

var login = 'admin';
var senha = '123456';

//express utilize a session
app.use(session({secret: '123456987**luisa'})); // como se fosse uma senha 
app.use(bodyParser.urlencoded({extended:true})); //recuperar os dados do formulario

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname,'public')));
app.set('views', path.join(__dirname,'/views'));

app.post('/',(req,res)=>{
    if(req.body.password == senha && req.body.login == login){
        // logado com sucesso!
        req.session.login = login;
        res.render('logado',{login:login}); //recarrega a pagina
    }else{
        res.render('index');
    }
    
})

// 1 rota
app.get('/',(req,res)=>{
    if(req.session.login){
        res.render('logado', {login:login}); //logado
    }else{
        res.render('index');//volta para o index
    }
})

app.listen(port,()=>{
    console.log('servidor rodando');
})
