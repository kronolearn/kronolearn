angular.module('kronolearn')
.controller('courseCtrl', function($scope, userService, masterService, courseService, $stateParams, $state) {

	var courseId = $stateParams.courseId;
    

	$scope.message = 'hello';

	userService.checkUserLogin()
	.then(function(user){
		console.log(user);
		$scope.user = user;
	})

	// practice hooking up front end to angular, will make call to server eventually

    $scope.currentCourseNumber = $stateParams;
    $scope.getCurrentCourse = function() {
        console.log("===test 1: ", $scope.currentCourseNumber);
        masterService.getCurrentCourse($scope.currentCourseNumber).then(function(response) {
            
            console.log("ULTIMATE RESPONSE:", response);
            $scope.currentCourse = response;
      });
    }
    
    $scope.goToTopic = function (id) {
        $state.go('topic', { topicId: id });
    }
                                                                
    
   //runs every time this controller loads, in order to grab the currentCourse info from the back-end
    $scope.currentCourse = $scope.course;
    $scope.getCurrentCourse();



    $scope.goToTopic = function(topicId){
        // console.log(courseId);
        // console.log(topicId);
        $state.go('topic', {courseId: courseId, topicId: topicId});
    }

    //this is where the form for creating a topic will be controlled
    
    $scope.showing = false;
    
    $scope.showForm = function () {
        $scope.showing = true;
    }
    
    $scope.createTopic = function () {
        $scope.showing = false;
        courseService.postTopic($scope.newTopic, $stateParams.courseId).then(function(topic){
            $scope.currentCourse.topics.push(topic);
        });
    }



});