var app = angular.module('kronolearn');


app.service('allCoursesService', function($http) {
    
    
    this.getAllCourses = function() {
        
        return $http.get('/api/courses').then(function(response){
            console.log("Here is response in service:", response);
            return response.data;
        });
        
    };
});