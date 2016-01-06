var app = angular.module('kronolearn');


app.controller('dashboardCtrl', function($scope, dashboardService) {
    
        // console.log($scope.user);
    $scope.out = function() {
        dashboardService.logout(); 
    };
    
});