var app = angular.module('kronolearn');


app.controller('dashboardCtrl', function ($scope, user, $state, dashboardService, allCoursesService) {
    // user is passed into dashboard ctrl from resolve in app.js
    $scope.user = user;
    // console.log($scope.user);

    
    dashboardService.getUserAndCourses()
        .then(function (user) {
            $scope.userInfo = user;
            $scope.courses = user.coursesEnrolledIn;
            $scope.adminCourses = user.coursesAdminFor;
            $scope.cards = user.cards;
            //$scope.notify();
       

    
    $scope.getCardsToReview = function() {
        
        dashboardService.getCardsToReview().then(function(response){
            console.log("Cards to review, dashboardCtrl data: ", response);
            $scope.cardsToReview = response;
            $scope.getCoursesToReview();
            console.log("Course IDs to review", $scope.courseIDsToReview);
            console.log("Courses to review", $scope.coursesToReview);
        });
    }
    
    $scope.getCardsToReview();
    
    $scope.courseIDsToReview = [];
    
    $scope.coursesToReview = [];
    
    $scope.getCoursesToReview = function() {
        for (var i = 0; i < $scope.cardsToReview.length; i++) {
            if ($scope.courseIDsToReview.indexOf($scope.cardsToReview[i].card.course) === -1) {
                $scope.courseIDsToReview.push($scope.cardsToReview[i].card.course);
            }
        }
        console.log("what is $scope.courses?: ", $scope.courses);
        for (var j = 0; j < $scope.courseIDsToReview.length; j++) {
            for (var k = 0; k < $scope.courses.length; k++) {
                if (($scope.courses[k]._id === $scope.courseIDsToReview[j]/* && ($scope.coursesToReview.indexOf($scope.courses[k]) === -1)*/) && ($scope.coursesToReview.length < $scope.courseIDsToReview.length)) {
                    $scope.coursesToReview.push($scope.courses[k]);
                }
            }
        }
    };
    
    
    
/*
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

    }; */

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
});