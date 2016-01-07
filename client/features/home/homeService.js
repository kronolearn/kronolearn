var app = angular.module('kronolearn');


app.service('homeService', function ($http, $state) {

    // Where the User Info is saved
    var user; 
    
    // Saving User Info
    this.saveUser = function (userInfo) {
        user = userInfo;
    };

// Getting User Info
    this.returnUser = function () {
        return user;
    };
    
    // Auth Logout. Also removes User Info
     this.logout = function () {
		$http.get('/api/logout').then(function (response) {
            user = {};
            $state.go('home');
			});
	};

});