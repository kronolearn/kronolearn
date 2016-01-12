var app = angular.module('kronolearn');


app.service('dashboardService', function($http, $state) {

	this.checkUserLogin = function(){
		return $http.get('/api/auth')
		.then(function(response){
			// console.log(response);
			return response.data;
		});
	};

	this.getUserAndCourses = function(){
		// console.log('getting here in service');
		return $http.get('/api/userAndCourses')
		.then(function(response){
			// console.log('response in service is', response.data);
			return response.data;
		});
	};
    
    
    
});