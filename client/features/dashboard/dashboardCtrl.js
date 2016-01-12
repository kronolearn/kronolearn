var app = angular.module('kronolearn');


app.controller('dashboardCtrl', function ($scope, dashboardService, user) {
    // user is passed into dashboard ctrl from resolve in app.js
    $scope.user = user;
   
    $scope.topicShow = false;

    dashboardService.getUserAndCourses()
        .then(function (user) {
            $scope.userInfo = user;
            $scope.courses = user.coursesEnrolledIn;
        });

    $scope.enrolledTopics = function () {
       if($scope.topicShow === true) {
           $scope.topicShow = false;
       } else {
           $scope.topicShow = true;
       }
    };

});