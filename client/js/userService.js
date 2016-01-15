angular.module('kronolearn')
.service('userService', function($http){

	this.checkUserLogin = function(){
		return $http.get('/api/auth')
		.then(function(response){
			// console.log(response);
			return response.data;
		})
	};


	this.enrollInCourse = function(courseId, userId){
		console.log('getting here to service');
		$http.put('/api/course/enrollInCourse?courseId='+courseId+'&userId='+userId)


		// .then(function(response){
		// 	return response;
		// })
	};

	this.leaveCourse = function(courseId, userId){
		$http.put('/api/course/leaveCourse?courseId='+courseId+'&userId='+userId);
	};
















})