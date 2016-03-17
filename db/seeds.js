var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/admissions");
var Test = require("../models/test")(mongoose);
var Submission = require("../models/submission")(mongoose);

Submission.remove({}, function(){
  Submission.create({
    email: "jesse@ga.co"
  }, function(err, sub){
    var t = {
        time: new Date(),
        score: "7/10",
        blob: "alert('hello world')"
    }
    sub.tests.push(t)
    sub.save(function(){
      console.log(sub)
    })
  })
})
