var app = angular.module('kronolearn');


app.controller('dashboardCtrl', function ($scope, user, $state, dashboardService, allCoursesService, userService) {
    // user is passed into dashboard ctrl from resolve in app.js
    $scope.user = user;
    // console.log($scope.user);

    
    dashboardService.getUserAndCourses()
        .then(function (user) {
            $scope.userInfo = user;
            $scope.courses = user.coursesEnrolledIn;
            $scope.adminCourses = user.coursesAdminFor;
            $scope.cards = user.cards;
            $scope.coursesEnrolledIn = user.coursesEnrolledIn;

            // creates array of courses enrolled in and admin for
            $scope.allCourses = user.coursesEnrolledIn.slice(0);
            $scope.allCourses.push(user.coursesAdminFor);

            $scope.allCourses = _.flatten($scope.allCourses);

            // remove duplicates
            for(var i=0; i<$scope.allCourses.length; i++){
                var courseId = $scope.allCourses[i]._id;
                for(var j=$scope.allCourses.length-1; j>i; j--){
                    var courseIdToCompare = $scope.allCourses[j]._id;
                    if(courseId===courseIdToCompare){
                        console.log('match');
                        // remove duplicate from array
                        $scope.allCourses.splice(j, 1);
                    }
                }
            }
       
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
        
        
        
        
        
        
        
        
    $scope.cardsToPass = [];
        
    $scope.passCardsToQuizCourse = function(courseId) {
        for (var i = 0; i < $scope.cardsToReview.length; i++) {
            if ($scope.cardsToReview[i].card.course === courseId) {
                $scope.cardsToPass.push($scope.cardsToReview[i].card);
            }
        }
        userService.addCards($scope.cardsToPass);
        $state.go('quiz');
    };
        
    $scope.passCardsToQuizTopic = function(topicId) {
        for (var i = 0; i < $scope.cardsToReview.length; i++) {
            if ($scope.cardsToReview[i].card.topic === topicId) {
                $scope.cardsToPass.push($scope.cardsToReview[i].card);
            }
        }
        userService.addCards($scope.cardsToPass);
        $state.go('quiz');
    };
        
        
    });
});