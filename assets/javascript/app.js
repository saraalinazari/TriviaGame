var trivia = {
    questionAnswersCol:[
        {question:"The Moon of Barods, a diamond that Marilyn Monroe wore when singing Diamonds Are A Girl's Best Friend in the film Gentlemen prefer Blondes, was auctioned off at Christies for how much in 1990?",
            possibleAnswers: ["$97,000","$297,000","$497,000","$797,000"],
            answer: 1,
            imgUrl: "assets/images/pic1.jpg"},
        {question:"Which one of these Academy Awards did Gone With the Wind not win?",
            possibleAnswers: ["best actor","best actress","best picture","best supporting actor"],
            answer: 0,
            imgUrl: "assets/images/pic2.jpg"},
        {question:"How much of his own money did Francis Ford Coppola put up to finish the movie ' Apocalypse Now' when it ran wildly over budget?",
            possibleAnswers: ["$1 million","$6 million","$16 million","$25 million"],
            answer: 2,
            imgUrl: "assets/images/pic3.jpg"},
        {question:"What was the name of the island on which King Kong was discovered in the original 1933 movie?",
            possibleAnswers: ["Ape Island","Borneo","Monster Island","Skull Island"],
            answer: 3,
            imgUrl: "assets/images/pic4.jpg"},
        {question:"Clint Eastwood gave us the immortal line, 'Go ahead... make my day', in what film?",
            possibleAnswers: ["Dirty Harry","Magnum Force","Sudden Impact","Tightrope"],
            answer: 0,
            imgUrl: "assets/images/pic5.jpg"}],
    questionID:0,
    interVal:0,
    clockRun:false,
    counter:0,
    notclicked:false,
    correct: "No Answer",
    answerSelect:0,
    correctAnswers: 0,
    wrongAnswers:0,


    showNextQuestion: function(){
        $("#startBtnDiv").empty();
        
        if(trivia.questionID <trivia.questionAnswersCol.length){
            trivia.finishShowingAns();
        var questionTemp = trivia.questionAnswersCol[trivia.questionID].question;
        var answersTemp = trivia.questionAnswersCol[trivia.questionID].possibleAnswers;
        console.log("answersTemp: "+ answersTemp);
        $("#question").text(questionTemp);



        trivia.counter=11;
        console.log("trivia.clockRun: "+trivia.clockRun);
        console.log("trivia.counter: "+trivia.counter);
        if(!trivia.clockRun){
            trivia.interVal = setInterval(trivia.showCounter,1000);
            trivia.clockRun = true;
        }
        var i=0;
        for(i=0;i<4;i++){
            var answersDiv = $("<div>");
            var divStr= "btn"+i.toString();
            var newAnswersBtn  = $("<button>");
            newAnswersBtn.text(answersTemp[i]);
            newAnswersBtn.attr("class","btn btn-outline-success m-2");
            newAnswersBtn.val(i.toString());
            newAnswersBtn.attr("data-name",i.toString());
            answersDiv.append(newAnswersBtn);
            $("#answers").append(answersDiv);
        }
        
    }
    else{
        trivia.showFinalResult();
    }
        
    },
    showCounter: function(){
        if(trivia.counter>0){
            trivia.counter--;
            $("#timeCounter").text("Remaining Time: "+trivia.counter);
            trivia.clockRun=false;

        }
        else{
            trivia.showAnswers1();
            //trivia.notclicked=true;
        }
        

    },
    showAnswers: function(){
        $("#answers").empty();
        $("#timeCounter").empty();
        $("#question").empty();

        
        
            var s=$(this).val();
            trivia.answerSelect = parseInt(s);
            console.log(s);
            console.log("inside Click option");
            trivia.checkAnswer();
      
        trivia.showingAnswer();

        clearInterval(trivia.interVal);
        setTimeout(trivia.showNextQuestion,5000);
        trivia.questionID++;
       
        console.log("this.questionID "+ trivia.questionID);

    },
    showAnswers1: function(){
        $("#answers").empty();
        $("#timeCounter").empty();
        $("#question").empty();

        trivia.showingAnswer();

        clearInterval(trivia.interVal);
        setTimeout(trivia.showNextQuestion,5000);
        trivia.questionID++;

        console.log("this.questionID "+ trivia.questionID);

    },
    checkAnswer: function(){
        console.log("inside checkAnswer/ trivia.answerSelect: " + trivia.answerSelect);
        if(trivia.answerSelect ==  trivia.questionAnswersCol[trivia.questionID].answer ){
            trivia.correct = "Correct!";
            trivia.correctAnswers++;
        }
        else{
            trivia.correct = "Wrong!";
            trivia.wrongAnswers++;
        }
    },
    showingAnswer: function(){
        //console.log("inside showing answer/ trivia.correct:%%%%%%%%%%%% " + trivia.correct);
        $("#feedback").text("Your Answer: "+trivia.correct);
        $("#timeCounter").text("Remaining Time: " + trivia.counter);
        
        var newDivImgAns = $("<div>");
        var newImgAns = $("<img>");
        newImgAns.attr("src",trivia.questionAnswersCol[trivia.questionID].imgUrl);
        newDivImgAns.append(newImgAns);
        $("#answerPic").append(newDivImgAns);

        
    },
    finishShowingAns: function(){
        $("#feedback").empty();
        $("#timeCounter").empty();
        $("#answerPic").empty();

        trivia.interVal=0;
        trivia.clockRun=false;
        trivia.counter=0;
        trivia.notclicked=false;
        trivia.correct= "No Answer";
        trivia.answerSelect=0;
    },
    showFinalResult: function(){
        $("#timeCounter").empty();
        $("#question").empty();
        $("#feedback").empty();
        $("#correctAnswer").empty();
        $("#answerPic").empty();
        $("#answers").empty();
        
        var newDivcorrect=$("<div>");
        newDivcorrect.text("Number of Correct Answers: "+trivia.correctAnswers);
        $("#feedback").append(newDivcorrect);
        var newDivWrong=$("<div>");
        newDivWrong.text("Number of Wrong Answers: "+trivia.wrongAnswers);
        $("#feedback").append(newDivWrong);
        var noanswer = trivia.questionAnswersCol.length-(trivia.wrongAnswers+trivia.correctAnswers);
        var newDivNo=$("<div>");
        newDivNo.text("Number of No Answers: "+noanswer);
        $("#feedback").append(newDivNo);


        var resetBtn = $("<button>");
        resetBtn.attr("id","restartButton");
        resetBtn.text("Reset the Game");
        resetBtn.attr("class","btn btn-lg btn-success m-5 p-3");
        var newDivResetBtn = $("<div>");
        newDivResetBtn.append(resetBtn);
        $("#feedback").append(newDivResetBtn);
        $("#restartButton").on("click", function(){
            location.replace(location.pathname);
        });
    }


}

    $("#startBtn").on("click",trivia.showNextQuestion);
    $("#answers").on("click",".btn", trivia.showAnswers);