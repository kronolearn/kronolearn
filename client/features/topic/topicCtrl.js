var app = angular.module("kronolearn");

<<<<<<< HEAD
app.controller('topicCtrl', function ($scope, topicService, $stateParams) {

    $scope.num = "23";
=======
app.controller('topicCtrl', function($scope, topicService, $stateParams, courseService) {
	var topicId = $stateParams.topicId;
	var courseId = $stateParams.courseId;

	$scope.getCourse = function(){
		courseService.getCourse(courseId)
		.then(function(course){
			$scope.course = course;
		})
	}

>>>>>>> master
    
    function progress(percent, element) {
        var progressBarWidth = percent * element.width() / 100;
        // With labels:
        element.find('div').animate({
            width: progressBarWidth
        }, 1200).html(percent + "%&nbsp;");

        // Without labels:
        //element.find('div').animate({ width: progressBarWidth }, 500);
    }

    $(document).ready(function () {
        $('.progressBar').each(function () {
            //alert('Hello');
            var bar = $(this);
            var max = $(this).attr('id');
            

            progress(max, bar);
        });
    });

    $scope.getTopic = function () {
<<<<<<< HEAD
        topicService.getTopic($stateParams.topicId).then(function (response) {
=======
        topicService.getTopic(topicId).then(function(response) {
>>>>>>> master
            $scope.topic = response;
            $scope.reviewMaterials = response.reviewMaterials;
        })
    }
<<<<<<< HEAD

=======
    
    $scope.getCourse();
>>>>>>> master
    $scope.getTopic();

});