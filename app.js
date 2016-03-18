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
    submissions = submissions.map(function(submission){
      if(submission.tests.length){
        submission.lastTest = submission.tests[submission.tests.length - 1]
      }
      return submission
    })
    res.render("admin",{submissions: submissions})
  })
})

app.post("/insecure", function(req, res){
  Submission.create({email: req.body.email}, function(err, submission){
    res.redirect("/" + submission._id);
  })
})

app.get("/:id", function(req, res){
  Submission.findOne({_id: req.params.id}, function(err, doc){
    var blob = doc.tests.length ? doc.tests[doc.tests.length - 1].blob : "// Insert code here."
    res.render("index", {blob: blob, _id: doc._id})
  })
})

app.post("/:id", function(req, res){
  Submission.findOne({_id: req.params.id}, function(err, doc){
    doc.tests.push({
      time: new Date(),
      blob: req.body.blob,
      score: req.body.score
    })
    doc.save(function(err){
      console.log(doc);
      var blob = doc.tests.length ? doc.tests[doc.tests.length - 1].blob : "// Insert code here."
      res.redirect("/" + doc._id)
    })
  })
})

app.listen(3000)
