angular.module('kronolearn')
.service('userService', function($http){

	this.checkUserLogin = function(){
		return $http.get('/api/auth')
		.then(function(response){
			// console.log(response);
			return response.data;
		})
	};
















})