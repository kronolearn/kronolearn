angular.module('kronolearn')
.controller('courseCtrl', function($scope, masterService, courseService, $stateParams, $state) {

	$scope.message = 'hello';

	// practice hooking up front end to angular, will make call to server eventually

    $scope.currentCourseId = $stateParams.courseId;
    
    $scope.getCurrentCourse = function() {
        masterService.getCurrentCourse($scope.currentCourseId).then(function(response) {
            
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
    
    

    
	$scope.course = {
		name: 'Anatomy',
		description: 'This is a course about human anatomy.  The course covers skeletal structure, muscles, blood vessels, and more!',
		picture: 'http://anatomynews.com/wp-content/uploads/2016/01/Anatomy-And-Physiology-2-Right-Elbow-Injury-Completely-Eradicated-Even-with-Open-and-Arthroscopic-Surgeries.jpg',
		topics: [{
			name: 'Skeletal Structure',
			description: 'this topic is about skeletal structure!',
			picture: 'http://craighitchenstherapies.com/wp-content/uploads/2014/01/the-skeletal-system--400x400_c.jpg',
			numToReview: 455
		},
		{
			name: 'Blood Vessels',
			description: 'blood vessels',
			picture: 'https://stayhealthier.files.wordpress.com/2010/03/cardiovascularsystem2.gif',
			numToReview: 5
		}],
		admins: [{
			name: 'Billy Joe',
			avatar: 'https://randomuser.me/api/portraits/men/96.jpg',
		},
		{
			name: 'Jane Something',
			avatar: 'https://randomuser.me/api/portraits/med/women/38.jpg'
		},
		{
			name: 'Samantha Jones',
			avatar: 'https://randomuser.me/api/portraits/med/women/80.jpg'
		},
		{
			name: 'Jack Blah',
			avatar: "https://randomuser.me/api/portraits/med/men/80.jpg"
		}]
	}






});