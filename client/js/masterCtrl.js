var app = angular.module('kronolearn');


app.controller('masterCtrl', function($scope, masterService, $state) {
    
        $scope.mastercoursesearch = undefined;
    
        $scope.masterCoursesArray = [];
    
        $scope.goToCourse = function() {
            console.log('getting here!');
            $state.go('home');
        };
    
    
        $scope.getAllCourses = function() {
        masterService.getAllCourses().then(function(response) {
          //  console.log("This is back-end MASTERCtrl response", response);
            for (var i = 0; i < response.length; i++) {
                $scope.masterCoursesArray.push(response[i]);
            }
        });
    };
    
        //runs every time masterCtrl loads, in order to have constant nav-bar typeahead capability
        $scope.getAllCourses();
    
});