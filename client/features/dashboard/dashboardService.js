var app = angular.module('kronolearn');


app.service('dashboardService', function($http, $state) {

	this.checkUserLogin = function(){
		return $http.get('/api/auth')
		.then(function(response){
			console.log(response);
			return response.data;
		})
	}
    
    
    
});