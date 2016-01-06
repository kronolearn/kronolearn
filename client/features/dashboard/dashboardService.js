var app = angular.module('kronolearn');


app.service('dashboardService', function($http, $state) {
    
     this.logout = function () {
		$http.get('/api/logout',
			this.user).then(function (res, err) {
				if (err) {
					// console.log(err);
					return;
				} $state.go('authTest');
			});
	};
    
});