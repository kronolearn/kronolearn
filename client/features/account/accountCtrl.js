angular.module('kronolearn')
.controller('accountCtrl', function($scope, user, userService, $window){
	console.log(user);

	// if user object exists, attach to scope, otherwise user not logged in
	if(user.name){
		$scope.user = user;
	}






	$scope.addPicture = function(){
		$scope.pictureAdded = true;
	}

	$scope.saveAccount = function(){
		// console.log($scope.imageObj);

		userService.saveUserAvatar($scope.imageObj, $scope.user)
		.then(function(response){
			// $window.location.reload();
		});


	}

















})