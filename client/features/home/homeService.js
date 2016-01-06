var app = angular.module('kronolearn');


app.service('homeService', function ($http) {

    var user;
    this.saveUser = function (userInfo) {
        user = userInfo;
    };

    this.returnUser = function () {
        return user;
    };

});