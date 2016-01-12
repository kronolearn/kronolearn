var app = angular.module('kronolearn');


app.controller('cardCtrl', function($scope, cardService, $stateParams) {
    
    $scope.currentCard = 0;
    
    $scope.userAnswers = [];
    
    $scope.currentCorrectAnswers = [];
    
    $scope.isSelected = "btn-primary";
    
    $scope.getCardInfo = function() {
        cardService.getCardInfo($stateParams.topicId).then(function(response) {
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
            alert("Correct!");
        }
        
        else {
            alert("Incorrect...");
        }
        
        $scope.currentCorrectAnswersCopy.length = 0;
        
        
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
    
});