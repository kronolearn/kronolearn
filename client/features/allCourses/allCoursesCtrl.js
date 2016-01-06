var app = angular.module('kronolearn');


app.controller('allCoursesCtrl', function($scope) {
    
    $scope.topicsShowing = false;
        
    $scope.allCoursesArray = [
        
        {
            name: "Javascript",
            description: "An intro course to the Javascript language",
            subjects: ["Computers", "Programming", "Web"],
            topics: ["Arrays", "Functions", "Closures"],
            admins: "Kyle",
            students: [83049, 20493],
            picture: "https://s3-us-west-2.amazonaws.com/kronolearn/coursePics/logo_JavaScript.png"
        },
        
        {
            name: "React",
            description: "An intro course to the Javascript language",
            subjects: ["Computers", "Programming", "Web"],
            topics: ["Components", "Webpack", "View"],
            admins: "Kyle",
            students: [83049, 20493],
            picture: "https://s3-us-west-2.amazonaws.com/kronolearn/coursePics/addthis-react-flux-javascript-scaling.png"
        }
    ];
    
});