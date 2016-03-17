var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var key = 'some key i created';
var cipher = require("simple-encryptor")(key);
app.use(express.static('public'));

mongoose.connect("mongodb://localhost/admissions");

var Test = mongoose.model("Test",{
  time: Date,
  score: String,
  blob: String
})

var Submission = mongoose.model("Submission", {
  encryptedEmail: String,
  tests: [Test]
})

app.use(bodyParser.urlencoded())
app.set("view engine","hbs");
app.get("/", function(req, res){
  res.render("index")
})

app.listen(3000)
