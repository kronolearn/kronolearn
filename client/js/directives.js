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
}); // end of search bar expand directive


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


///////////////////////////////////////////////////
//  Directive for dropzone
///////////////////////////////////////////////////
angular.module('kronolearn')
.directive('dropzone', function($http){
	return {
		link: function(scope, elem, attrs){
			$(function(){
				// elem.dropzone({url: '/file/post'});
				// var $dropzone = $(elem);






				var myDropzone = new Dropzone('div.add-image', {
					url: '/api/course/addCourseImage',
					// method: 'POST',
					clickable: '.clickable',
					acceptedFiles: 'image/*',

					accept: function(file, done){
						console.log(file);
						var reader = new FileReader();
						reader.onload = handleReaderLoad;
						reader.readAsDataURL(file);
						function handleReaderLoad(e){
							$('div.add-image')[0].setAttribute('value', e.target.result);
							var fileName = file.name;
							var longString = e.target.result;
							var imageExtArr = (longString.split(';')[0].split('/'))
							var imageExt = imageExtArr[imageExtArr.length-1];
							console.log(imageExt)


							// console.log(e.target.result);
							// console.log(typeof e.target.result);

							scope.$parent.imageObj = {
								imageName: fileName,
								imageExtension: imageExt,
								imageValue: longString
							};

							// console.log(objToSend);






							// console.log(e.target.result.length);

							// $http.post('/api/course', imageObj);
							
							// window.copy(e.target.result);
							// alert(e.target.result);
						}
					}





					// init: function(){
					// 	this.on('addedfile', function(file){
					// 		console.log(file);
					// 		console.log(file.upload);
					// 		$http.post('/api/course/addCourseImage', JSON.stringify(file));
					// 	})
					// }

				});



				// elem.click(function(){
				// 	console.log('click');
				// })



				   
			}); // jquery ready
		}// link 
	}; // return
}); // whole directive






















