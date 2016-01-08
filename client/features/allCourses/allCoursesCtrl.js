var app = angular.module('kronolearn');


app.controller('allCoursesCtrl', function($scope, allCoursesService, $state) {
    
    $scope.topicsShowing = false;
    
    $scope.coursesearch = undefined;
    
    $scope.allSubjects = ["...All..."];
    
    $scope.allCoursesArray = [];
    
    $scope.getSubjects = function() {

        for (var i = 0; i < $scope.allCoursesArray.length; i++) {
            for (var j = 0; j < $scope.allCoursesArray[i].subjects.length; j++) {
                if ($scope.allSubjects.indexOf($scope.allCoursesArray[i].subjects[j]) === -1) {
                    //console.log("CURRENT: ", $scope.allSubjects);
                    //console.log("NOW ADDING: ", $scope.allCoursesArray[i].subjects[j]);
                    $scope.allSubjects.push($scope.allCoursesArray[i].subjects[j]);
                }
            }
        }
    };
    
    $scope.getAllCourses = function() {
        allCoursesService.getAllCourses().then(function(response) {
            console.log("This is back-end response", response);
            for (var i = 0; i < response.length; i++) {
                $scope.allCoursesArray.push(response[i]);
            }
        $scope.getSubjects();
        console.log("all the subjects...");
        console.log($scope.allSubjects);
        });

    };
    
    
    //runs every time allCoursesCtrl is loaded.
    $scope.getAllCourses();
    
    $scope.goToCoursePage = function(courseIn) {
        console.log('tHiS iS iNdEx:', courseIn.courseNumber);
        $state.go('course', {courseId: courseIn.courseNumber});
    };
    
    $scope.changeFilterSubject = function(subjectIn) {
        if (subjectIn === "...All...") {
            subjectIn = undefined;
        }
        $scope.subjectFilter = subjectIn;
    };
    
});