angular.module('kronolearn')
.service('userService', function($http){

	this.checkUserLogin = function(){
		return $http.get('/api/auth')
		.then(function(response){
			// console.log(response);
			return response.data;
		})
	};


	this.enrollInCourse = function(courseId, userId){
		// console.log('getting here to service');
		$http.put('/api/enrollInCourse?courseId='+courseId+'&userId='+userId)


		// .then(function(response){
		// 	return response;
		// })
	};

	this.leaveCourse = function(courseId, userId){
		console.log(courseId, userId);
		$http.put('/api/leaveCourse?courseId='+courseId+'&userId='+userId);
	};

	this.saveUserAvatar = function(imageObj, user){
		console.log(imageObj);
		return $http.put('/api/saveUserAvatar', {imageObj: imageObj, user: user})
		.then(function(response){
			return response.data;
		})
	};
    
    this.currentReviewArray = [
       {
    "_id" : "569420fc388ad0fc138b8962",
    "question" : "Which character is missing from the first line of this function?  var myFunc = function ()",
    "numWrong" : 0,
    "numReviews" : 0,
    "QuestionType" : "MultipleAnswer",
    "tags" : [ 
        "Return Value"
    ],
    "answers" : [ 
        {
            "text" : "{",
            "correctAnswer" : true,
            "_id" : "569420fc388ad0fc138b8965"
        }, 
        {
            "text" : ";",
            "correctAnswer" : false,
            "_id" : "569420fc388ad0fc138b8964"
        }, 
        {
            "text" : "'",
            "correctAnswer" : false,
            "_id" : "569420fc388ad0fc138b8963"
        }
    ],
    "__v" : 0
}
        
];
















})