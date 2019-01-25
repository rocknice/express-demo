var express = require('express');
var app = express();
var mysql = require('mysql');
var swig = require('swig');
app.use(express.static('public'));
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'wsy2656970',
  database : 'yii2basic'
});
 
connection.connect();
 
app.get('/', function(req, res, next){
    res.render('index');
})
app.get('/receive', function(req, res, next){
    console.log('前台发送的数据：', req.query.username);
    var post = {
        name: req.query.username
    }
    connection.query('INSERT INTO userinfo SET ?', post, function (error, results, fields) {
        console.log(error)
        if (error) {
            res.json({
                success: 'no',
                msg: '插入失败'
            })
        } else {
            res.json({
                success: 'ok',
                msg: '插入成功'
            })
        }
    });
})
// app.get('/index', function(req, res, next) {
//     res.json = {
//         data: 'hello'
//     };
// })
// 容错机制，把错误状态码返回给前端
app.get('*', function(req, res, next){
    res.status(404);
    res.end('404');
});
// 服务器错误中间件
app.use(function(req, res, next){
    res.status(500);
    res.end('error...');
});
app.listen('8081', function () {
console.log('接口已启动')
})