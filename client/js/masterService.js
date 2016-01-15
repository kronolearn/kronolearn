var app = angular.module('kronolearn');


app.service('masterService', function($http) {
        this.getAllCourses = function() {
            
        return $http.get('/api/courses').then(function(response){
           // console.log("Here is response in MASTERservice:", response);
            return response.data;
        });
    };
    

    
        this.getCurrentCourse = function(courseNumber) {
            console.log('url params? ', courseNumber);
            return $http.get('/api/course/' + courseNumber).then(function(response) {
                console.log("courseServiceRETURN", response.data);
                return response.data;
            });
        }
        
        this.goToCourse = function(idNumIn) {
            this.currentCourseId = idNumIn;
            this.getCurrentCourse(this.currentCourseId);
            
        };
});