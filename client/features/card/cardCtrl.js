var app = angular.module('kronolearn');


app.controller('cardCtrl', function($scope, cardService, $stateParams) {
    
    $scope.currentCard = 0;
    
    $scope.getCardInfo = function() {
        cardService.getCardInfo($stateParams.topicId).then(function(response) {
            console.log("This is CARD response in cardCtrl: ", response);
            $scope.currentTopic = response;
        });
    };
    
    $scope.getCardInfo();
    
    $scope.nextCard = function() {
        $scope.currentCard++;
    };
    
    $scope.prevCard = function() {
        $scope.currentCard--;
    }
    
});