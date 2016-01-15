angular.module('kronolearn')
.controller('courseCtrl', function($scope, userService, masterService, courseService, $stateParams, $state) {
	var courseNumber = $stateParams.courseId;


	userService.checkUserLogin()
	.then(function(user){
		console.log(user);
		$scope.user = user;
		$scope.userId = user._id;

	   //runs every time this controller loads, in order to grab the currentCourse info from the back-end
	   masterService.getCurrentCourse(courseNumber)
	   .then(function(course) {
	   	console.log("COURSE RESPONSE:", course);
	   	$scope.course = course;
	   	checkIfUserIsAdmin(user, course);

	   	checkIfUserIsEnrolled(user, course);



	   });

 }) // end of user checking login



	function checkIfUserIsAdmin(user, course) {
		for(var i=0; i<course.admins.length; i++){
			var admin = course.admins[i];
			if(admin._id===user._id){
				console.log('user is admin of course');
				$scope.userIsAdminOfCourse = true;
				break;
			}
			if(i===course.admins.length-1){
				console.log('user is not admin of course!!');
				$scope.userIsAdminOfCourse = false;
			}
		}
	}

	function checkIfUserIsEnrolled(user, course){
		// edge case if course has no students
		if(course.students.length===0){
			$scope.userIsEnrolled = false;
		}

		// console.log('function getting fired');
		for(var i=0; i<course.students.length; i++){
			var student = course.students[i];
			if(student._id===user._id){
				console.log('user is in course!')
				$scope.userIsEnrolled = true;
				break;
			}
			if(i===course.students.length-1){
				console.log('student isnt in course');
				$scope.userIsEnrolled = false;
			}
		}
	}


	$scope.enrollInCourse = function(){
		console.log($scope.course._id, $scope.user._id);
		userService.enrollInCourse($scope.course._id, $scope.user._id)
		// .then(function(response){
		// 	console.log(response);
		// })

		;
		$scope.userIsEnrolled = true;
	};
	$scope.leaveCourse = function(){
		userService.leaveCourse($scope.course._id, $scope.user._id);
		$scope.userIsEnrolled = false;

	};

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