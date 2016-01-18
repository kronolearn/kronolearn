var app = angular.module("kronolearn");


app.controller('topicCtrl', function($scope, topicService, $stateParams, courseService, $state, userService) {
	var topicId = $stateParams.topicId;
	var courseId = $stateParams.courseId;
    
    $scope.getUserInfo = function () {
        userService.checkUserLogin().then(function(user){
            $scope.user = user;
        })
    }
    
    $scope.getUserInfo();
    
    
    $scope.progress = 75;
    

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
        $state.go('quiz', {topicId: topicId});
    };
    
    $scope.createCards = function(topicId) {
        $state.go('createQuiz', {topicId: topicId, courseId: courseId});
    };
    
    $scope.showMaterial = false;
    
    $scope.displayMaterial = function() {
        $scope.showMaterial = true;
    }
    
    $scope.addMaterial = function() {
        $scope.showMaterial = false;
        $scope.material.materialUrl = $scope.material.materialUrl.replace("http://", "").replace("https://", "");
        topicService.addMaterial($scope.material, $scope.topic._id).then(function(topic) {
            var reviewMaterialToAdd = topic.reviewMaterials[topic.reviewMaterials.length-1];
            console.log(reviewMaterialToAdd);
            $scope.topic.reviewMaterials.push(reviewMaterialToAdd);
            //console.log($scope.topic);
        });
    }
    
    

});