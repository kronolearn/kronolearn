angular.module('kronolearn')
.controller('createCourseCtrl', function($scope, user, courseService, $state){
	console.log(user);

	$scope.hideSearchBar = true;


	$scope.admins = [{
		name: user.name,
		avatar: user.avatar,
		id: user._id

	}];


	$scope.createCourse = function(newCourse){
		console.log(newCourse);

		if($scope.imageObj){
			console.log($scope.imageObj);
			newCourse.imageObj = $scope.imageObj;
		}


		newCourse.admins = $scope.admins;
		console.log(newCourse);

		courseService.addCourse(newCourse)
		.then(function(response){
			console.log(response);
			$state.go('course', {courseId: response.courseNumber});
		});





	}











})