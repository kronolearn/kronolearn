var app = angular.module('kronolearn');


app.controller('homeCtrl', function ($scope, $http, $state, homeService) {


    $scope.signup = function () {
        $http.post('/api/signup', $scope.user).then(function (user) {
            if (user) {
                $scope.user = user.data;
                homeService.saveUser($scope.user);
                $state.go('dashboard');
            }
        });
    };

    $scope.userInfo = function (userinfo) {
        $scope.user = homeService.returnUser();
    };

    $scope.userInfo();

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

    $scope.out = function () {
        homeService.logout();

    };



});