var app = angular.module('kronolearn');


app.controller('quizCtrl', function($scope, quizService, $stateParams, userService, $state) {
    
    userService.checkUserLogin()
	.then(function(user){
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
    
    $scope.qResponse = 3;
    
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
        if ($stateParams.topicId) {
            quizService.getCardInfo($stateParams.topicId).then(function(response) {
                $scope.currentTopic = response;
            });
        }
        else {
            console.log("FINAL ARRAY?:", userService.currentReviewArray);
            $scope.currentTopic = {
                name: "Review",
                cards: userService.currentReviewArray
            }
        }
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

//Populates the currentCorrectAnswers array; the currentUserAnswers array gets checked against this on each card/question.
    $scope.getCurrentCorrectAnswers = function() {
        for (var i = 0; i < $scope.currentTopic.cards[$scope.currentCard].answers.length; i++) {
            if ($scope.currentTopic.cards[$scope.currentCard].answers[i].correctAnswer === true) {
                if ($scope.currentCorrectAnswers.indexOf($scope.currentTopic.cards[$scope.currentCard].answers[i].text) === -1)
                    $scope.currentCorrectAnswers.push($scope.currentTopic.cards[$scope.currentCard].answers[i].text);
            }
        }
    };

//Checks to see if user answered correctly or not.
    $scope.answerCheck = function() {
        $scope.getCurrentCorrectAnswers();
        $scope.allGood = true;
        $scope.currentCorrectAnswersCopy = [];
        for (var i = 0; i < $scope.currentCorrectAnswers.length; i++) {
            $scope.currentCorrectAnswersCopy.push($scope.currentCorrectAnswers[i]);
        }

        for (var i = 0; i < $scope.userAnswers.length; i++) {
            if ($scope.currentCorrectAnswersCopy.indexOf($scope.userAnswers[i]) !== -1) {
                var indexToRemove = $scope.currentCorrectAnswersCopy.indexOf($scope.userAnswers[i]);
                $scope.currentCorrectAnswersCopy.splice(indexToRemove, 1);
            }
            else {
                $scope.allGood = false;
            }
        }
        
        if ($scope.currentCorrectAnswersCopy.length === 0 && $scope.allGood) {
            $scope.answerIsCorrect = true;
        }
        
        else {
            $scope.answerIsIncorrect = true;
        }
        
        //clears the currentCorrectAnswersCopy array.
        $scope.currentCorrectAnswersCopy.length = 0;
        
        
    };
    
//Whenever user clicks on a different answer, it is added to/removed from array.
    $scope.changeUserAnswer = function(answerText) {
        if ($scope.userAnswers.indexOf(answerText) === -1) {
            $scope.userAnswers.push(answerText);
        }
        else if ($scope.userAnswers.indexOf(answerText) !== -1) {
            var indexToRemove = $scope.userAnswers.indexOf(answerText);
            $scope.userAnswers.splice(indexToRemove, 1);
        }
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
}

$scope.cardStopWatch = new $scope.Stopwatch();
$scope.cardStopWatch.start(); //Start the stopwatch on new card load;


//Used to stop the timer and record the timeTaken on quizQuestionSubmit.
$scope.stopTimer = function() {

    $scope.cardStopWatch.stop();
    console.log($scope.cardStopWatch.getSeconds());
    $scope.timeTaken = $scope.cardStopWatch.getSeconds();
    $scope.cardStopWatch.clear();
}




$scope.getQresponse = function() {
    if ($scope.timeTaken < 10 && $scope.answerIsCorrect)
        $scope.qResponse = 5;
    
    else if ($scope.timeTaken >= 10 && $scope.timeTaken < 20 && $scope.answerIsCorrect)
        $scope.qResponse = 4;
    
    else if ($scope.timeTaken >= 20 && $scope.answerIsCorrect)
        $scope.qResponse = 3;
    
    else if ($scope.answerIsIncorrect) {
        if ($scope.isNewUserCard) {
            $scope.qResponse = 2;
        }
        
        else {
            $scope.qResponse = 1;
        }
    }
}



$scope.pushUserAnswerResult = function() {
    
        userService.checkUserLogin()
	.then(function(user){
		$scope.user = user;
	})
        
        //Gets UPDATED user info (info since the last quiz question was submitted).
        quizService.getUserInfo($scope.user._id).then(function(response) {
            $scope.userCopy = response;
        
        
   
   
            
            $scope.isNewUserCard = true; //Used in qResponse function.
            var isNewUserCard = true;  //Used locally, in this function.
            for (var i = 0; i < $scope.userCopy.cards.length; i++) {
                if ($scope.userCopy.cards[i].card === $scope.currentTopic.cards[$scope.currentCard]._id) {
                    isNewUserCard = false;
                    $scope.isNewUserCard = false;
                }
            }        

            $scope.getQresponse();

            
//Adds current Card to User.cards, if not already in array.
            if (isNewUserCard) {
                // EF: 2.5(default), qResponse, 0 times reviewed previous to now, and lastInterval was 0;
                var nextReview = spacedRepetition(2.5, $scope.qResponse, 0, 0);
                var currDate = new Date();
                var nextReviewDate = currDate;
                nextReviewDate.setHours(nextReviewDate.getHours() + nextReview.interval * 24);
                
                var currDate2 = new Date(); 
                
                var newCardObj = {
                    card: $scope.currentTopic.cards[$scope.currentCard]._id,
                    reviews: [{
                        date: currDate2,
                        qResponse: $scope.qResponse,
                        ef: nextReview.easyF,
                        lastInterval: 1
                    }],
                    dateNextReview: nextReviewDate
                };
                
                
                quizService.addNewCard(newCardObj, $scope.user._id).then(function(response) {
                    console.log(response);
                });
            }

//Updates Card that is already in User.cards
            
/*

IMPLEMENT ALGORITHM HERE
--if user answered incorrectly...factor in previous qResponse
--update EF
--update lastInterval


--findOneAndUpdate
--reviews.push ReviewObject (date, qResponse, EF, lastInterval)
--change dateNextReview


*/
            
//If previous qResponse was 2 or 1, and current question was answered incorrectly, qResponse will be 1.

            
            else {
                for (var i = 0; i < $scope.userCopy.cards.length; i++) {
                    if ($scope.currentTopic.cards[$scope.currentCard]._id == $scope.userCopy.cards[i].card)
                        currCard = $scope.userCopy.cards[i];
                }
                //var currCard = $scope.userCopy.cards[$scope.currentCard];
                
                
                
                    if ($scope.qResponse === 2 && (currCard.reviews[currCard.reviews.length - 1].qResponse === 2 || currCard.reviews[currCard.reviews.length - 1].qResponse === 1)) {
                        $scope.qResponse = 1;
                    }
                        
                        var oldEasyF = currCard.reviews[currCard.reviews.length - 1].ef;
                        var timesReviewed = currCard.reviews.length;
                        var lastInterval;
                        if (currCard.reviews.length === 1) {
                            lastInterval = 6;
                        }
                
                        else {
            
                            lastInterval = currCard.reviews[currCard.reviews.length - 1].lastInterval;
                            console.log("LAST INTERVAL (before algorithm): ", lastInterval);
                        }
                        
                
                        console.log("INFO being sent to SPACED REP algorithm...", oldEasyF, $scope.qResponse, timesReviewed, lastInterval); 
                        var nextReviewInfo = spacedRepetition(oldEasyF, $scope.qResponse, timesReviewed, lastInterval);
                        console.log("NEXT REVIEW INFO (after algorithm): ", nextReviewInfo);
                        console.log("Hello World!");
                    
                    var currDate = new Date();
                    var nextReviewDate = currDate;
                    nextReviewDate.setHours(nextReviewDate.getHours() + nextReviewInfo.interval * 24);
                
                    var currDate2 = new Date();
                
                    var newReviewObj = {
                    //cardIndex: $scope.currentCard,
                    cardID: $scope.currentTopic.cards[$scope.currentCard]._id,
                    newReview: {
                        date: currDate2,
                        qResponse: $scope.qResponse,
                        ef: nextReviewInfo.easyF,
                        lastInterval: nextReviewInfo.interval
                    },
                    dateNextReview: nextReviewDate
                };
                
                console.log(newReviewObj);
                
                
                quizService.updateCard(newReviewObj, $scope.user._id).then(function(response) {
                    console.log("UPDATED CARD backend-response: ", response);
                });  
            }
        });
}

$scope.endQuiz = function() {
    $state.go('dashboard');
}

});