angular.module('kronolearn')
.controller('createCourseCtrl', function($scope, user){
	console.log(user);

	$scope.hideSearchBar = true;


	$scope.admins = [{
		name: user.name,
		avatar: user.avatar,

	}];


	$scope.createCourse = function(newCourse){
		console.log(newCourse);

		console.log($scope.imageObj);

		newCourse.admins = $scope.admins;
		console.log(newCourse);
	}











})