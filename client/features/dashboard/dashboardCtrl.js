var app = angular.module('kronolearn');


app.controller('dashboardCtrl', function ($scope, user, $state, dashboardService, allCoursesService) {
    // user is passed into dashboard ctrl from resolve in app.js
    $scope.user = user;
    // console.log($scope.user);
    // $scope.getTags = function () {
    // $scope.card.tags.forEach(function (tag) {
    //     console.log(tag);
    // });

    // };
    // $scope.reviewCourseIds = [];
    // $scope.findcourseTags = function () {
    //     $scope.courses.forEach(function (course) {
    //         $scope.courseEnrolled = course;
    //         console.log(course._id);
    //         $scope.courseEnrolled.topics.forEach(function (topic) {
    //             $scope.topicEnrolled = topic;
    //             console.log(topic._id);
    //             $scope.topicEnrolled.tags.forEach(function (tag) {
    //                 $scope.enrolledTags;
    //                 $scope.enrolledTags += tag;
    //                 console.log(tag);

    //             });
                
    //             console.log($scope.enrolledTags);
    //             console.log($scope.enrolledTag);
    //         });
    //     });
    // };



    $scope.notify = function () {
        $scope.cards.forEach(function (card) {
            $scope.card = card;
            $scope.tags = card.card.tags;
            // console.log($scope.tags);
            $scope.date = card.dateNextReview;
        });
        // console.log(typeof $scope.tags[0]);
        $scope.today = Date.now();
        $scope.reviewDate = Date.parse($scope.date);
        if ($scope.reviewDate < $scope.today) {
            $scope.findcourseTags();
            $scope.tags.forEach(function (tag) {
                $scope.cardTag = tag;
            });
            // console.log($scope.cardTag);
            // console.log($scope.enrolledTag);
            // if ($scope.cardTag === $scope.enrolledTag) {
            //     console.log("Match Found");
            // } else {
            //     console.log("No Matches!");
            // }
            
            // console.log($scope.cardTag);
            // console.log($scope.courses[0].topics[0].tags);
            // $scope.allCourses = allCoursesService.getAllCourses();
            // $scope.allCourses.
            // console.log($scope.card._id);
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

    $scope.enrollBtn = function () {
        $state.go('allCourses');
    };

    $scope.addCourse = function () {
        $state.go('createCourse');
    };







});