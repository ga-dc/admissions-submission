var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var key = 'some key i created';
var cipher = require("simple-encryptor")(key);
app.use(express.static('public'));

mongoose.connect("mongodb://localhost/admissions");


app.use(bodyParser.urlencoded())
app.set("view engine","hbs");
app.get("/", function(req, res){
  res.render("index")
})

app.listen(3000)
