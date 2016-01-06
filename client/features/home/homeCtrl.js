var app = angular.module('kronolearn');


app.controller('homeCtrl', function($scope, homeService) {
    // console.log($scope.user);
    $scope.out = function() {
        homeService.logout(); 
    };
    
});