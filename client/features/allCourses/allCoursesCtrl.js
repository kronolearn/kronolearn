var app = angular.module('kronolearn');


app.controller('allCoursesCtrl', function($scope, allCoursesService, $state) {
    
    $scope.topicsShowing = false;
    
    $scope.coursesearch = undefined;
    
    $scope.getAllCourses = function() {
        allCoursesService.getAllCourses().then(function(response) {
            console.log("This is back-end response", response);
            for (var i = 0; i < response.length; i++) {
                $scope.allCoursesArray.push(response[i]);
            }
        });
    };
    
    
    //runs every time allCoursesCtrl is loaded.
    $scope.getAllCourses();
    
    $scope.goToCoursePage = function(courseIn) {
        console.log('tHiS iS iNdEx:', courseIn.courseNumber);
        $state.go('course', {courseId: courseIn.courseNumber});
    };
    
    $scope.allCoursesArray = [];
    
});