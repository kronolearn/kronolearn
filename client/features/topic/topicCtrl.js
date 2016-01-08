var app = angular.module("kronolearn");

app.controller('topicCtrl', function ($scope, topicService, $stateParams) {

    $scope.num = "23";
    
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
        topicService.getTopic($stateParams.topicId).then(function (response) {
            $scope.topic = response;
            $scope.reviewMaterials = response.reviewMaterials;
        })
    }

    $scope.getTopic();

});