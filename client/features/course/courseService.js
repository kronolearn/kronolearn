var app = angular.module('kronolearn');


app.service('courseService', function($http) {
    
    
    this.getCurrentCourse = function(currentCourseId) {
        return $http.get('/api/course/' + currentCourseId).then(function(response) {
            console.log("courseServiceRETURN");
            return response.data;
        });
    }
    
    
});