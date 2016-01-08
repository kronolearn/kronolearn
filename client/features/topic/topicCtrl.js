var app = angular.module("kronolearn");

app.controller('topicCtrl', function($scope, topicService, $stateParams) {
    
    $scope.getTopic = function () {
        topicService.getTopic($stateParams.topicId).then(function(response) {
            $scope.topic = response;
            $scope.reviewMaterials = response.reviewMaterials;
        })
    }
    
    $scope.getTopic();
    
});