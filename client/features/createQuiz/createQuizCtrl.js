angular.module('kronolearn').controller('createQuizCtrl', function($scope, createQuizService, $stateParams) {
    
    $scope.getCard = function() {
        createQuizService.getTopic($stateParams.topicId).then(function(response) {
            $scope.quizTopic = response;
        });
    }
    
    $scope.getCard();
    
    
    
    $scope.postCard = function() {
        $scope.newCard.topic = $stateParams.topicId;
        $scope.newCard.answers = [];
        $scope.newCard.answers.push($scope.first, $scope.second, $scope.third, $scope.fourth);
        console.log($scope.newCard);
        createQuizService.postCard($scope.newCard).then(function(response) {
            console.log(response);
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