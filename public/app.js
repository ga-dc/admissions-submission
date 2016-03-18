(function(){
  console.log("here")
  var ael  = EventTarget.prototype.addEventListener
  EventTarget.prototype.addEventListener = function(e,cb){
    this.listeners = this.listeners || 0;
    this.listeners++;
    ael.call(this,e,cb)
  }
  var btn = document.querySelector("#check");
  var tests = document.getElementById("tests");
  var scoreInput = document.querySelector("[name='score']");
  var form = document.querySelector("form");
  var code = document.querySelector("#code")
  var totalTests = 0;
  var score = 0;

  function test(description, one){
    var div = document.createElement("div");
    div.innerHTML = "<h3>"+description+"</h3>"
    if(!!one){
      div.innerHTML += "passed";
      div.classList.add("pass");
      score++;
    }else{
      div.innerHTML += "fail";
      div.classList.add("fail");
    }
    tests.appendChild(div);
    totalTests++;
    scoreInput.value = score + "/" + totalTests;
  }

  function checkBg(color){
    var b = document.body
    return b.style.background === "red" || b.style.backgroundColor === "red" || b.classList.contains("one")
  }

  btn.addEventListener("click", function(event){
    totalTests = 0;
    score = 0;
    event.preventDefault();
    eval(code.value);
    tests.innerHTML = "";

    var red = document.getElementById("redButton");
    test("red button has event listener", red.listeners);
    $(red).trigger("click");
    test("red button click changes body background", checkBg("red"));
    red.listeners = 0;

    var white = document.getElementById("whiteButton");
    test("white button has event listener", white.listeners);
    white.listeners = 0;

    var blue = document.getElementById("blueButton");
    test("blue button has event listener", blue.listeners);
    blue.listeners = 0;

    var yellow = document.getElementById("yellowButton");
    test("yellow button has event listener", yellow.listeners);
    yellow.listeners = 0;

    $.ajax({
      method: "post",
      url: form.action,
      data: {
        date: new Date,
        score: scoreInput.value,
        blob: code.value
      }
    });
    // document.querySelector("form").submit();
 })

})();
