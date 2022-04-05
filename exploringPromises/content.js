console.log("Content script, check.");

chrome.runtime.onMessage.addListener(hear);
function hear(message, sender, sendResponse){
    console.log("Message received:", message)
    //====================================
    // PROMISE WITH DEFINED RESOLVE AND REJECT FUNCTIONS
    var promise1 = new Promise(function(fun1, fun2) {
        function fun1(){console.log("Is even.")}
        function fun2(){console.log("Is odd.")}
        var a = message.a
        var b = message.b
        if((a + b) % 2 == 0) {
            fun1();
        } else {
            fun2();
        }
      });
    // Demonstrating how the following are not executed
    promise1.
      then(function(){
          console.log("Hello there.");
      })
      .catch(function(){
          console.log("General Kenobi!");
      });
    //====================================
    // PROMISE WITH CONSUMERS
    // Using only .then to carry forward resolve and reject
    var promise3 = new Promise(function(fun1, fun2) {
        var a = message.a
        var b = message.b
        if((a + b) % 2 == 0){
            fun1("Is even.");
        } else{
            fun2("Is odd.");
        }
      }); 
    promise3.
        then(function(arg1){
            console.log(arg1);
        }, function(arg1){
            console.log(arg1);
        });
    //------------------------
    // Using other data types and number of arguments
    var promise4 = new Promise(function(fun1, fun2) {
        var a = message.a
        var b = message.b
        if((a + b) % 2 == 0){
            fun1(0, "Is even");
        } else{
            fun2("Is odd.", 1);
        }
      }); 
    // Only the first argument of the following will be defined
    promise4.
        then(function(arg1, arg2){
            console.log(arg1, arg2);
        })
        .catch(function(arg1, arg2){
            console.log(arg1, arg2);
        });
}