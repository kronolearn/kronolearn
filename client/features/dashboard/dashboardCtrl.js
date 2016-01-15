var app = angular.module('kronolearn');


app.controller('dashboardCtrl', function ($scope, user, $state, dashboardService, allCoursesService) {
    // user is passed into dashboard ctrl from resolve in app.js
    $scope.user = user;
    // console.log($scope.user);



    $scope.notify = function () {
        $scope.cards.forEach(function (card) {
            $scope.card = card;
            $scope.date = card.dateNextReview;
        });
        $scope.today = Date.now();
        $scope.reviewDate = Date.parse($scope.date);
        if ($scope.reviewDate < $scope.today) {
            console.log("New Notifications");
        } else {
            console.log("no notifications today");
        }

    };

    dashboardService.getUserAndCourses()
        .then(function (user) {
            $scope.userInfo = user;
            $scope.courses = user.coursesEnrolledIn;
            $scope.adminCourses = user.coursesAdminFor;
            $scope.cards = user.cards;
            $scope.notify();


        });



    $scope.topicClick = function (id) {
        $state.go('topic', { topicId: id });
    };
    
    $scope.courseClick = function (id) {
        $state.go('course', { courseId: id });
    };

    $scope.enrollBtn = function () {
        $state.go('allCourses');
    };

    $scope.addCourse = function () {
        $state.go('createCourse');
    };







});