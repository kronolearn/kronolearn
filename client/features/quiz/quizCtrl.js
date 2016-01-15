var app = angular.module('kronolearn');


app.controller('quizCtrl', function($scope, quizService, $stateParams, userService) {
    
    userService.checkUserLogin()
	.then(function(user){
		console.log('initial user: ', user);
		$scope.user = user;
        $scope.userCopy = $scope.user;
	})
    
    $scope.currentCard = 0;
    
    $scope.userAnswers = [];
    
    $scope.currentCorrectAnswers = [];
    
    $scope.isSelected = "btn-primary";
    
    $scope.answerIsCorrect = false;
    
    $scope.answerIsIncorrect = false;
    
    $scope.submitEnabled = true;
    
    $scope.nextArrowShowing = false;
    
    $scope.userAnswerResults = [];
    
    $scope.toggleSubmitAccess = function() {
        $scope.submitEnabled = !$scope.submitEnabled;
    }
    
    $scope.toggleNextArrow = function() {
        $scope.nextArrowShowing = !$scope.nextArrowShowing;
    }
    
    $scope.markReset = function() {
        $scope.answerIsCorrect = false;
        $scope.answerIsIncorrect = false;
    }
    
    $scope.getCardInfo = function() {
        quizService.getCardInfo($stateParams.topicId).then(function(response) {
            $scope.currentTopic = response;
        });
    };
    
    $scope.getCardInfo();
    
    $scope.nextCard = function() {
        $scope.userAnswers = [];
        $scope.currentCorrectAnswers = [];
        $scope.currentCard++;
    };
    
    $scope.prevCard = function() {
        $scope.userAnswers = [];
        $scope.currentCorrectAnswers = [];
        $scope.currentCard--;
    };
    
    $scope.getCurrentCorrectAnswers = function() {
        for (var i = 0; i < $scope.currentTopic.cards[$scope.currentCard].answers.length; i++) {
            if ($scope.currentTopic.cards[$scope.currentCard].answers[i].correctAnswer === true) {
                if ($scope.currentCorrectAnswers.indexOf($scope.currentTopic.cards[$scope.currentCard].answers[i].text) === -1)
                    $scope.currentCorrectAnswers.push($scope.currentTopic.cards[$scope.currentCard].answers[i].text);
            }
        }
    };
    
    $scope.answerCheck = function() {
        $scope.getCurrentCorrectAnswers();
        $scope.allGood = true;
        $scope.currentCorrectAnswersCopy = [];
        for (var i = 0; i < $scope.currentCorrectAnswers.length; i++) {
            $scope.currentCorrectAnswersCopy.push($scope.currentCorrectAnswers[i]);
        }
        //console.log("all correct answers: ", $scope.currentCorrectAnswers);

        for (var i = 0; i < $scope.userAnswers.length; i++) {
            if ($scope.currentCorrectAnswersCopy.indexOf($scope.userAnswers[i]) !== -1) {
                var indexToRemove = $scope.currentCorrectAnswersCopy.indexOf($scope.userAnswers[i]);
                $scope.currentCorrectAnswersCopy.splice(indexToRemove, 1);
            }
            else {
                $scope.allGood = false;
                //console.log("Wrong Answer?");
            }
        }
       // console.log("final array...should be empty for correct", $scope.currentCorrectAnswersCopy);
        if ($scope.currentCorrectAnswersCopy.length === 0 && $scope.allGood) {
            $scope.answerIsCorrect = true;
            //alert("Correct!");
        }
        
        else {
            $scope.answerIsIncorrect = true;
            //alert("Incorrect...Correct Answers were: " + $scope.currentCorrectAnswers);
        }
        
        $scope.currentCorrectAnswersCopy.length = 0;
        //$scope.pushUserAnswerResult();
        
        
    };
    
    $scope.changeUserAnswer = function(answerText) {
        if ($scope.userAnswers.indexOf(answerText) === -1) {
            $scope.userAnswers.push(answerText);
        }
        else if ($scope.userAnswers.indexOf(answerText) !== -1) {
            var indexToRemove = $scope.userAnswers.indexOf(answerText);
            $scope.userAnswers.splice(indexToRemove, 1);
        }
        
        //console.log($scope.userAnswers);
        
    };
    
    
    

    
    
    
    
    
$scope.Stopwatch = function (){
  var startTime, endTime, instance = this;

  this.start = function (){
    startTime = new Date();
  };

  this.stop = function (){
    endTime = new Date();
  };

  this.clear = function (){
    startTime = null;
    endTime = null;
  };

  this.getSeconds = function(){
    if (!endTime){
    return 0;
    }
    return /*Math.round*/((endTime.getTime() - startTime.getTime()) / 1000);
  };
/*
  this.getMinutes = function(){
    return instance.getSeconds() / 60;
  }      ;
  this.getHours = function(){
    return instance.getSeconds() / 60 / 60;
  };
  this.getDays = function(){
    return instance.getHours() / 24;
  };   */
}

$scope.cardStopWatch = new $scope.Stopwatch();
$scope.cardStopWatch.start(); //Start the stopwatch
// As a test, I use the setTimeout function to delay st.stop();

$scope.stopTimer = function() {

    $scope.cardStopWatch.stop();
    console.log($scope.cardStopWatch.getSeconds());
    $scope.timeTaken = $scope.cardStopWatch.getSeconds();
    $scope.cardStopWatch.clear();
    //$scope.cardStopWatch.start();
}







$scope.pushUserAnswerResult = function() {
    
    
        userService.checkUserLogin()
	.then(function(user){
		console.log('ok NOW the user: ', user);
		$scope.user = user;
	})
        
        quizService.getUserInfo($scope.user._id).then(function(response) {
            console.log('WOOOOOHOOOOO', response);
            $scope.userCopy = response;
       
    //might have to do a new server call instead of the above call...the above call only calls to AUTH endpoint, maybe i need to get the USER? could also change this up above!!! (near beginning of controller, instead of setting $scope.user = *whatever the AUTH returns*
        
        
    var currDate = new Date();
    var nextReviewDate = currDate;
    nextReviewDate.setHours(nextReviewDate.getHours() + 24);
    var currDate2 = new Date();
    

    var questionNumber = $scope.currentCard + 1;
    

   /* var userAnswerObj = {
        cardId: $scope.currentTopic.cards[$scope.currentCard]._id,
        date: currDate,
        timeTaken: $scope.timeTaken,
        answeredCorrectly: $scope.answerIsCorrect,
        questionNumber: questionNumber
    };
    $scope.userAnswerResults.push(userAnswerObj); */
    //console.log("These are the user answers...", $scope.userAnswerResults);
    

    var cardObj = {
        card: $scope.currentTopic.cards[$scope.currentCard]._id,
        reviews: [{
            date: currDate2
        
        }],
        dateNextReview: nextReviewDate
    };
    
    var isNewUserCard = true;
    for (var i = 0; i < $scope.userCopy.cards.length; i++) {
        if ($scope.userCopy.cards[i].card === $scope.currentTopic.cards[$scope.currentCard]._id) {
            isNewUserCard = false;
            console.log("ok really...this SHOULD be showing up.", $scope.userCopy.cards[i].card._id);
            console.log("...2: ", $scope.currentTopic.cards[$scope.currentCard]._id);
        }
    }
    if (isNewUserCard) {
        
        console.log("New Card Detected! Adding now...");
        quizService.addNewCard(cardObj, $scope.user._id).then(function(response) {
            console.log(response);
        });
    }
 });
}


});