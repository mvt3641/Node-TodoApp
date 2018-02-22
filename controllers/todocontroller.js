var bodyParser = require('body-parser');
var mongoose = require('mongoose');


//connect to the database
mongoose.connect('mongodb://test:test@ds143678.mlab.com:43678/nas_todo');



//Create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
  item: String
})

// model for DB
var Todo = mongoose.model('Todo', todoSchema);




//var data=[{item:'get milk'},{item:'walk the dog'},{item:'cut the grass'}];
var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function(app){

  app.get('/todo', function(req,res){
    //get data from mongoDB and pass it to the view
    Todo.find({}, function(err,data){
      if (err) throw err;
      res.render('todo',{todos: data});
    });
  });

  app.post('/todo', urlencodedParser, function(req,res){
    //get data from the view and add it MongoDB
    var newTodo = Todo(req.body).save(function(err,data){
      if (err) throw err;
      res.json(data);
    })
  });

  app.delete('/todo/:item', function(req,res){
    // delete requested item from MongoDB
    Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err,data){
      if(err) throw err;
      res.json(data);
    });
  });

};
