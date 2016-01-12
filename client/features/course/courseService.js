var app = angular.module('kronolearn');


app.service('courseService', function($http) {

	this.getCourse = function(courseId){
		return $http.get('/api/course/'+courseId)
		.then(function(response){
			return response.data;
		});
	};






    
   
    this.getCurrentCourse = function(currentCourseId) {
        return $http.get('/api/course/' + currentCourseId).then(function(response) {
            console.log("courseServiceRETURN");
            return response.data;
        });
    };
    
  
});