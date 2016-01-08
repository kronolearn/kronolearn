var app = angular.module("kronolearn");

app.controller('topicCtrl', function($scope, topicService, $stateParams, courseService) {
	var topicId = $stateParams.topicId;
	var courseId = $stateParams.courseId;

	$scope.getCourse = function(){
		courseService.getCourse(courseId)
		.then(function(course){
			$scope.course = course;
		})
	}

    
    $scope.getTopic = function () {
        topicService.getTopic(topicId).then(function(response) {
            $scope.topic = response;
            $scope.reviewMaterials = response.reviewMaterials;
        })
    }
    
    $scope.getCourse();
    $scope.getTopic();
    
});