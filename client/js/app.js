var app = angular.module('kronolearn', ['ui.router', 'ui.bootstrap', 'ui.bootstrap.typeahead', 'ngMessages']);


app.config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider
    
    .state('home', {
        url: '/',
        templateUrl: './features/home/homeTmpl.html',
        controller: 'homeCtrl'
    })
    
    .state('topic', {
        url: '/course/:courseId/topic/:topicId',
        templateUrl: './features/topic/topicTmpl.html',
        controller: 'topicCtrl'
    })
    
    .state('dashboard', {
        url: '/dashboard/:dashboardId',
        templateUrl: './features/dashboard/dashboardTmpl.html',
        controller: 'dashboardCtrl',
        resolve:  {
        	user: function(dashboardService){
        	return dashboardService.getUserAndCourses();
        }
      }
    })
    
    .state('course', {
        url: '/course/:courseId',
        templateUrl: './features/course/courseTmpl.html',
        controller: 'courseCtrl'
    })

    .state('authTest', {
        url: '/authTest',
        templateUrl: './features/authTest/authTestTmpl.html',
        controller: 'authTestCtrl'
    })
    
    .state('allCourses', {
        url: '/allCourses',
        templateUrl: './features/allCourses/allCoursesTmpl.html',
        controller: 'allCoursesCtrl'
    })
    
    .state('quiz', {
        url: '/topic/:topicId/quiz',
        templateUrl: '/features/quiz/quizTmpl.html',
        controller: 'quizCtrl'
    })
    
    .state('createQuiz', {
        url: '/quiz/:topicId/createQuiz',
        templateUrl: '/features/createQuiz/createQuizTmpl.html',
        controller: 'createQuizCtrl',
        params: {courseId: null}
    })
/*
    .state('card', {
        url: '/topic/:topicId/card',
        templateUrl: './features/card/cardTmpl.html',
        controller: 'cardCtrl'
    })
*/

    ///////////////////////////////////////////////////
    //  Creating course, topic, and card views       //
    ///////////////////////////////////////////////////

    .state('createCourse', {
    	url: '/create-course',
    	templateUrl: './features/createCourse/createCourseTmpl.html',
    	controller: 'createCourseCtrl',
    	resolve: {
    		user: function(userService){
    			return userService.checkUserLogin();
    		}
    	}
    })

  ///////////////////////////////////////////////////
  //  Account view
  ///////////////////////////////////////////////////

  .state('account', {
  	url: '/account',
  	templateUrl: './features/account/account.html',
  	controller: 'accountCtrl',
  	resolve: {
  		user: function(userService){
  			return userService.checkUserLogin();
  		}
  	}
  })














    ;
    
    $urlRouterProvider.otherwise('/');
    
});