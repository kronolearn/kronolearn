var app = angular.module('kronolearn');


app.service('authTestSrvc', function($http, $state) {
    var user;
    this.saveUser = function(userInfo) {
        user = userInfo;
    };
    
    this.returnUser = function() {
        return user;
    };
    
    
});