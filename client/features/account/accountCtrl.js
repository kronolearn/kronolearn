angular.module('kronolearn')
.controller('accountCtrl', function($scope, user, userService, $window, $state){
	console.log(user);

	// if user object exists, attach to scope, otherwise user not logged in
	if(user.name){
		$scope.user = user;

		// override user if necessary when adding new picture
		userService.checkUserLogin()
		.then(function(user){
			console.log('user serivce user is', user);
			$scope.user = user;
		})




	}







	$scope.addPicture = function(){
		$scope.pictureAdded = true;
	}

	$scope.saveAccount = function(){
		console.log($scope.imageObj);

		userService.saveUserAvatar($scope.imageObj, $scope.user)
		.then(function(user){
			console.log(user);
			$('div.dz-preview').css('display', 'none');
			$scope.user = user;
			$scope.pictureAdded = false;
			// $scope.pictureAdded = false;
			// location.reload();
		})

			// location.reload();
			// $window.location.reload();


		}

		$scope.cancel = function(){
		// $state.go('account');
		location.reload();
	}

















})