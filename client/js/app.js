var app = angular.module('kronolearn', ['ui.router']);


app.config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider
    
    .state('home', {
        url: '/',
        templateUrl: './features/home/homeTmpl.html',
        controller: 'homeCtrl'
    })
    
    .state('topic', {
        url: '/topic/:topicId',
        templateUrl: './features/topic/topicTmpl.html',
        controller: 'topicCtrl'
    })
    
    .state('dashboard', {
        url: '/dashboard/:dashboardId',
        templateUrl: './features/dashboard/dashboardTmpl.html',
        controller: 'dashboardCtrl'
    })
    
    .state('course', {
        url: '/course/:courseId',
        templateUrl: './features/course/courseTmpl.html',
        controller: 'courseCtrl'
    })
    
    .state('allCourses', {
        url: '/allCourses',
        templateUrl: './features/allCourses/allCoursesTmpl.html',
        controller: 'allCoursesCtrl'
    });
    
    $urlRouterProvider.otherwise('/');
    
});