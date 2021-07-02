console.log("script Loaded");

$(document).ready(function () {

  var quizData = [];
  function renderQuestionQuizz(data) {


    var section = $("<section>");
    var question = $("<h3>").html("Q" + data.id + ". "+ data.question)

    section.append(question);

    for (var j = 0; j < data.options.length; j++) {
      var optionWrapper = $("<label>").addClass("option-wrapper")
      var input = $("<input>").attr("type", "radio").attr("name",
        "q" + data.id).attr("value", (j+1)).attr("required", "true").attr(
          "id", "q" + data.id + "-" + (j+1)
        );
      var label = $("<span>").html(data.options[j])

      optionWrapper.append(input, label);

      section.append(optionWrapper);
    }
    var divider = $("<div>").addClass("divider");
    $("#quiz-form").append(section,divider);

  }

  $.get("http://5d76bf96515d1a0014085cf9.mockapi.io/quiz", function (response) {

    quizData = response;
    for (var i = 0; i < response.length; i++) {
      // console.log(response[i]);
      renderQuestionQuizz(response[i]);

    }

    $("#quiz-form").append($("<input>").attr("type", "submit"));


  });

  /*
    var obj = {
      "q1" :3,
      "q2" : 1,
      "q3" : 3
      "q4" : 2,

    }
  */

  $("#quiz-form").submit(function(e){
    e.preventDefault();
    
    var result = {};
    var radioButtons = $(".option-wrapper input");
   
    for(var j = 0; j < radioButtons.length; j++){

        if(radioButtons[j].checked){
          console.log(radioButtons[j]);
          result[radioButtons[j].name] = radioButtons[j].value; 
        }

    }

    // console.log(result);

    var score = 0;
    
    //quizData == response .

    //CHECK IF SELECT OPTION IS CORRECT OR NOT START!!
    for(var j = 0;j < quizData.length;j++){
      var key = "q" + quizData[j].id;  // q1,q2 ..
      
      var selector = ("#" + (key + "-" + result[key]) + "+ span" );

      if(result[key] == quizData[j].answer){
        score++

        //q1-1 , q2-3 
        // $(selector).html($(selector).html() + "   [correct]");
        $(selector).html($(selector).addClass("correct").html());
      }
      else{
        var correctOptionSelector = ("#" + (key + "-" + quizData[j].answer) + "+ span" );
        $(correctOptionSelector).html($(correctOptionSelector).addClass("correct").html());
        $(selector).html($(selector).addClass("incorrect").html());
      }
    }

    console.log("scored : " + score);

    $("#score").html(score + "/" + 5) ;
    // /CHECK IF SELECT OPTION IS CORRECT OR NOT END!!?

  })


});
