angular.module('kronolearn').controller('createQuizCtrl', function($scope, createQuizService, $stateParams) {
    
    $scope.getCard = function() {
        createQuizService.getTopic($stateParams.topicId).then(function(response) {
            $scope.quizTopic = response;
        });
    }
    
    $scope.getCard();
    
});