module.exports = function(mongoose){
  var Test = mongoose.model("Test",{
    time: Date,
    score: String,
    blob: String
  })
  return Test
};
