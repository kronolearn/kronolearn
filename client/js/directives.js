angular.module('kronolearn')
.directive('searchbarExpand', function(){
	return {
		link: function(scope, elem, attrs){
			$(function(){
				var $searchWrapper = $(elem);
				var $input = $searchWrapper.find('input.search-bar-peter');

				// $input.focus(function(){
				// 	$searchWrapper.animate({
				// 		width: "330px"
				// 	}, 200);
				// });

				$input.focus(function(){
					$searchWrapper.addClass('expand');
				})

				$input.blur(function(){
					$searchWrapper.removeClass('expand');
					// $searchWrapper.css('width', '270px')
				})
				// $input.blur(function(){
				// 	$searchWrapper.animate({
				// 		width: '270px'
				// 	}, 150);
				// })




		});
		}
	}
})