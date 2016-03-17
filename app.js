var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var key = 'some key i created';
var cipher = require("simple-encryptor")(key);
app.use(express.static('public'));

mongoose.connect("mongodb://localhost/admissions");

var Submission = require("./models/submission")(mongoose);

app.use(bodyParser.urlencoded())
app.set("view engine","hbs");
app.get("/", function(req, res){
  res.render("index")
})

app.get("/insecure", function(req, res){
  Submission.find({}, function(err, submissions){
    res.render("admin",{submissions: submissions})
  })
})

app.get("/:id", function(req, res){
  Submission.findOne({_id: req.params.id}, function(err, doc){
    console.log(doc)
    var blob = doc.tests[doc.tests.length - 1].blob
    res.render("index", {blob: blob})
  })
})

app.listen(3000)
