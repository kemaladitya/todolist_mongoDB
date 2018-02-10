var express = require('express');
var todoController = require('./controllers/todoController');
var app = express();
// pasang engine viewnya
app.set('view engine', 'ejs');

// staticfile (midwarenya)
app.use(express.static('./public'));

//fire controllers
todoController(app);

// listen port
app.listen(3000);
console.log('port 3000 lagi jalan');
