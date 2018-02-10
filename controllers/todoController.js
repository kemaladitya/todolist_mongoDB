var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// konek //
mongoose.connect('mongodb://test:blackpearl123@ds123698.mlab.com:23698/todo');

// create schema like blueprint
var todoSchema = new mongoose.Schema({
  item: String
});
var Todo = mongoose.model('Todo', todoSchema);

//var data = [{item: 'learning'}, {item: 'go to jakarta'}, {item: 'kick some coding ass'}];
var urlencodedParser = bodyParser.urlencoded({ extended: false });


module.exports = function(app){

  app.get('/todo' , function(req, res){
    //get data from mongodb
    Todo.find({}, function(err, data){
      if (err) throw err;
      res.render('todo', {todos: data});
    })

  });

  app.post('/todo' , urlencodedParser, function(req, res){
    //get data from view and add to mongodb
    var newTodo = Todo(req.body).save(function(err,data){
      if (err) throw err;
      res.json(data);
    });

  });

  app.delete('/todo/:item' , function(req, res){
    //delet from mongodb
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
      if (err) throw err;
      res.json(data);
    })
  });

};
