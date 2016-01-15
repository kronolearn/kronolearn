angular.module('kronolearn')
.controller('accountCtrl', function($scope, user){
	console.log(user);

	// if user object exists, attach to scope, otherwise user not logged in
	if(user.name){
		$scope.user = user;
	}

















})