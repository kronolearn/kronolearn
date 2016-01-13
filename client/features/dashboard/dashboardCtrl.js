var app = angular.module('kronolearn');


app.controller('dashboardCtrl', function ($scope, dashboardService, user, $state) {
    // user is passed into dashboard ctrl from resolve in app.js
    $scope.user = user;


    dashboardService.getUserAndCourses()
        .then(function (user) {
            $scope.userInfo = user;
            $scope.courses = user.coursesEnrolledIn;
            $scope.adminCourses = user.coursesAdminFor;
            console.log($scope.courses);
            console.log($scope.adminCourses);
        });

    $scope.topicClick = function (id) {
        console.log(id);
        $state.go('topic', { topicId: id });
    };

    $scope.enrollBtn = function () {
        $state.go('allCourses');
    };

    $scope.addCourse = function () {
        $state.go('createCourse');
    };
    
    // $scope.buttonShow = true;
    
    // $scope.adminShow = false;
    
    // $scope.topicShow = function () {
    //     $scope.adminShow = true;
    //     $scope.buttonShow = false;
    // };
    
   
  


});