angular.module('kronolearn')
.directive('progressBar', function () {

    return {
        
        link: function (scope, elem, attrs) {
            console.log('progress bar directive');

            function progress(percent, element) {
                var progressBarWidth = percent * element.width() / 100;
                // With labels:
                element.find('div').animate({
                    width: progressBarWidth
                }, 1200);
                // Without labels:
                //element.find('div').animate({ width: progressBarWidth }, 500);
            }

            $(document).ready(function () {
                $('.progressBar').each(function () {
                    //alert('Hello');
                    var bar = $(this);
                    var max = scope.progress;
                    
                    progress(max, bar);
                });
            });

        }
    }

});