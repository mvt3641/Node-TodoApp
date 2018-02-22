var express = require('express');
var todocontroller = require('./controllers/todocontroller')

var app = express();

// setup template engine
app.set('view engine', 'ejs');

app.use(express.static('./public'));




//fire controllers
todocontroller(app);

//listen to port

app.listen(3000);
console.log("you are listening to port 3000")
