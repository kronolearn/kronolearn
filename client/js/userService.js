angular.module('kronolearn')
.service('userService', function($http){

	this.checkUserLogin = function(){
		return $http.get('/api/auth')
		.then(function(response){
			// console.log(response);
			return response.data;
		})
	};

	this.getUser = function(userId){
		return $http.get('/api/user/'+userId)
		.then(function(response){
			return response.data;
		})

	}


	this.enrollInCourse = function(courseId, userId){
		// console.log('getting here to service');
		$http.put('/api/enrollInCourse?courseId='+courseId+'&userId='+userId)


		// .then(function(response){
		// 	return response;
		// })
	};

	this.leaveCourse = function(courseId, userId){
		console.log(courseId, userId);
		$http.put('/api/leaveCourse?courseId='+courseId+'&userId='+userId);
	};

	this.saveUserAvatar = function(imageObj, user){
		console.log(imageObj);
		return $http.put('/api/saveUserAvatar', {imageObj: imageObj, user: user})
		.then(function(response){
			return response.data;
		})
	}
















})