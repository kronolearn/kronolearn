var app = angular.module('kronolearn');


app.controller('homeCtrl', function ($scope, $http, $state, homeService) {

    // Auth signup
    $scope.signup = function () {
        if ($scope.user.password !== $scope.passwordcheck) {

            // some UI event to alert that passwords don't match, without another popup
            // (ie, border of red, or message, etc)


            // alert('dont match');
            // swal("Your Passwords Don't Match!");
        } else {
            $http.post('/api/signup', $scope.user).then(function (user) {
                if (user) {
                    // $scope.user = user.data;
                    $state.go('dashboard');
                }
            });
        }
    };
    
   
// Auth Login
    $scope.login = function () {
        $http.post('/api/login',
            $scope.user).then(function (user) {
                if (user) {
                    $state.go('dashboard');
                }
            });
    };


});