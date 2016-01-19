angular.module('kronolearn').controller('createQuizCtrl', function($scope, createQuizService, $stateParams) {
    
    // variables needed from state params
    var courseNumber = Number($stateParams.courseId);
    var topicId = $stateParams.topicId;



    $scope.getCard = function() {
        createQuizService.getTopic($stateParams.topicId).then(function(response) {
            $scope.quizTopic = response;
        });
    }
    
    $scope.getCard();
    
    
    
    $scope.postCard = function() {
        $scope.newCard.topicId = topicId;
        $scope.newCard.courseNumber = courseNumber;
        var pushFilled = [$scope.first, $scope.second, $scope.third, $scope.fourth];
        $scope.newCard.answers = [];
        pushFilled.forEach(function(answer) {
            if (answer) {
                $scope.newCard.answers.push(answer);
            }
        })
        console.log($scope.newCard);
        createQuizService.postCard($scope.newCard).then(function(response) {
            $scope.newCard = "";
            $scope.first.text = "";
            $scope.second.text = "";
            $scope.third.text = "";
            $scope.fourth.text = "";
            $scope.first.correctAnswer = false;
            $scope.second.correctAnswer = false;
            $scope.third.correctAnswer = false;
            $scope.fourth.correctAnswer = false;
        });
    }
    
    $scope.goBack = function() {
        window.history.back();
    }
    
});