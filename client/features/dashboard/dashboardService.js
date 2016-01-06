var app = angular.module('kronolearn');


app.service('dashboardService', function($http, $state) {
    
     this.logout = function () {
         console.log('logout');
		$http.get('/api/logout').then(function (response) {
            console.log('im in');
            console.log(response);
            $state.go('home');
            
				// if (err) {
				// 	console.log(err);
				// 	return;
				// // } $state.go('home');
                // }
			});
	};
    
});