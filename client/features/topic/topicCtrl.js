var app = angular.module("kronolearn");


app.controller('topicCtrl', function($scope, topicService, $stateParams, courseService, $state) {
	var topicId = $stateParams.topicId;
	var courseId = $stateParams.courseId;
    $scope.bacon = 75;

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
    
    $scope.goToQuiz = function(topicId) {  
        $state.go('card', {topicId: topicId});
    };
    
    $scope.showMaterial = false;
    
    $scope.displayMaterial = function() {
        $scope.showMaterial = true;
    }
    
    $scope.addMaterial = function() {
        $scope.showMaterial = false;
        topicService.putTopic($scope.topic);
    }

});