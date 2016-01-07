var app = angular.module('kronolearn');


app.service('homeService', function ($http, $state) {

    var user;
    this.saveUser = function (userInfo) {
        user = userInfo;
    };

    this.returnUser = function () {
        return user;
    };
    
     this.logout = function () {
		$http.get('/api/logout').then(function (response) {
            user = {};
            $state.go('home');
			});
	};

});