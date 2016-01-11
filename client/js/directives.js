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
}) // end of search bar expand directive


// user menu of results tab
angular.module('kronolearn')
.directive('userMenu', function(){
	return {
		link: function(scope, elem, attrs){
			$(function(){
				var $userProfile = $(elem);
				var $userMenu = $userProfile.find('.user-menu');

				// hides usermenu at first, to be sure
				$userProfile.removeClass('show-menu');
				$userMenu.hide();

				// when clicked, toggle userMenu, and toggle class
				// font awesome caret icon
				$userProfile.click(function(e){
					e.stopPropagation();
					$userMenu.toggle();
					$userProfile.toggleClass('show-menu');
				});

				// clicking anywhere else can close window as well
				$('html').click(function(e){
					if($userProfile.hasClass('show-menu')) {
						$userProfile.removeClass('show-menu');
						$userMenu.toggle();
					}
				}) // end of html click event

			}) // jquery ready
		}
	}
});
