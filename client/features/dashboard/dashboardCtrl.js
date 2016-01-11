var app = angular.module('kronolearn');


app.controller('dashboardCtrl', function($scope, dashboardService, user) {
	// user is passed into dashboard ctrl from resolve in app.js
  $scope.user = user;
  
  $scope.list = [{name: 'hello'}, {name: 'blah'}];
  
  
  $scope.courses = [{
      name: "Our first course!",
      description: "My Description, whoo!",
      admins: ["kellie", "Josh"],
      topics: ["topic1", "topic2"],
      subjects : [ 
        "subject one", 
        "subject two"
    ],
      picture: "http://img.wikinut.com/img/gycf69_-6rv_5fol/jpeg/0/Best-Friends-Img-Src%3AImage%3A-FreeDigitalPhotos.net.jpeg"
  }];
  console.log($scope.courses);
//   $scope.userInfo = dashboardService.getUserAndCourses();
  
//   console.log($scope.userInfo);
//   console.log($scope.user);
  
  
//   $scope.courses = $scope.user.coursesEnrolledIn;
 
//   $scope.enrolledCourses = {};
//   $scope.getCourses = function() {
//       for(var i = 0; i < $scope.courses.length; i++) {
//           $scope.enrolledCourses += $scope.courses[i]; 
//           console.log($scope.courses[i]);
//       }
//   };
  
//   $scope.getCourses();
//   console.log($scope.enrolledCourses);

  

// console.log("Hello");







    
});