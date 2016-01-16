var app = angular.module('kronolearn');


app.service('courseService', function($http) {

	this.getCourse = function(courseId){
		return $http.get('/api/course/'+courseId)
		.then(function(response){
			return response.data;
		});
	};

	this.addCourse = function(course){
		return $http.post('/api/course', course)
		.then(function(response){
			return response.data;
		})

	}






    
   
    this.getCurrentCourse = function(currentCourseId) {
        return $http.get('/api/course/' + currentCourseId).then(function(response) {
            console.log("courseServiceRETURN");
            return response.data;
        });
    };
    
    
    this.postTopic = function (topic) {
        return $http.post('/api/topic', topic).then(function(response) {
            return response.data;
        })
    }
  
});