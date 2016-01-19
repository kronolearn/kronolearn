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
            console.log(user);
            $scope.userInfo = user;
            $scope.courses = users.coursesEnrolledIn;
            $scope.coursesEnrolledIn = user.coursesEnrolledIn;
            $scope.adminCourses = user.coursesAdminFor;

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

            $scope.allCourses = $scope.allCourses;









            // $scope.allCourses = _.flattenDeep($scope.allCourses);
            console.log($scope.allCourses);

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