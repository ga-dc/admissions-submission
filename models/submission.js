module.exports = function(mongoose){
  var Submission = mongoose.model("Submission", {
    email: String,
    tests: []
  })
  return Submission
}
