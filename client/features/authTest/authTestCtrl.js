angular.module('kronolearn').controller('authTestCtrl', function ($scope, $state, $http, authTestSrvc ) {
    $scope.signup = function () {
        $http.post('/api/authTest', $scope.user).then(function (user) {
            if (user) {
                $scope.user = user.data;
                authTestSrvc.saveUser($scope.user);
                $state.go('home');
            }
        });
    };
    

    $scope.userInfo = function(userinfo) {
        $scope.user = authTestSrvc.returnUser();
        // $scope.user = userinfo;
        // console.log($scope.user);
        // return $scope.user;
		// console.log(userinfo);
        // $scope.userInfo = userInfo;
        
		// return $http.put('/api/user/' + $scope.user._id, $scope.user);
                    };
                    
    $scope.userInfo();                

    $scope.login = function () {
        $http.post('/api/login',
            $scope.user).then(function (user) {
                if (user) {
                    $scope.user = user.data;
                    authTestSrvc.saveUser($scope.user);
                    // var userinfo = user.data;
                    $state.go('home');
                    // console.log(user.data);
                    // $scope.user = user.data;
                }
            });
    };
    
    
    
    
});