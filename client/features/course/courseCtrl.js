angular.module('kronolearn')
.controller('courseCtrl', function($scope, userService, masterService, courseService, $stateParams, $state) {

	var courseNumber = $stateParams.courseId;


	userService.checkUserLogin()
	.then(function(user){
		console.log(user);
		$scope.user = user;
		var userId = user._id;

	   //runs every time this controller loads, in order to grab the currentCourse info from the back-end
	   masterService.getCurrentCourse(courseNumber)
	   .then(function(course) {
	   	console.log("COURSE RESPONSE:", course);
	   	$scope.course = course;

	   	// checking if user is admin of course on page, if so, show the edit capabilities, otherwise, no
	   	for(var i=0; i<course.admins.length; i++){
	   		var admin = course.admins[i];
	   		if(admin._id===userId){
	   			console.log('user is admin of course');
	   			$scope.userIsAdminOfCourse = true;
	   			break;
	   		}
	   		if(i===course.admins.length-1){
	   			console.log('user is not admin of course!!');
	   			$scope.userIsAdminOfCourse = false;
	   		}
	   	}
	   	//_______________End of checking if user admin of course_______________


	 });

 }) // end of user checking login



	$scope.goToTopic = function (id) {
		$state.go('topic', { topicId: id });
	}






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
    		$scope.course.topics.push(topic);
    	});
    };





  });