var app = angular.module('kronolearn');


app.controller('homeCtrl', function ($scope, $http, $state, homeService) {

    // Auth signup
    $scope.signup = function () {
        if ($scope.user.password !== $scope.passwordcheck) {
            swal("Passwordos No Se Macham");
        } else {
            $http.post('/api/signup', $scope.user).then(function (user) {
                if (user) {
                    $scope.user = user.data;
                    homeService.saveUser($scope.user);
                    $state.go('dashboard');
                }
            });
        }
    };
    
    // How the user info is getting stored
    $scope.userInfo = function (userinfo) {
        $scope.user = homeService.returnUser();
    };
    $scope.userInfo();

// Auth Login
    $scope.login = function () {
        $http.post('/api/login',
            $scope.user).then(function (user) {
                if (user) {
                    $scope.user = user.data;
                    homeService.saveUser($scope.user);
                    $state.go('dashboard');
                }
            });
    };

// Auth Logout
    $scope.out = function () {
        homeService.logout();

    };



});