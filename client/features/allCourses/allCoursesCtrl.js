var app = angular.module('kronolearn');


app.controller('allCoursesCtrl', function($scope) {
    
    $scope.topicsShowing = false;
    
    $scope.coursesearch = undefined;
        
    $scope.allCoursesArray = [
        
        {
            description: "An intro course to the Javascript language",
            subjects: ["Computers", "Programming", "Web"],
            topics: ["Arrays", "Functions", "Closures"],
            admins: "Kyle",
            students: [83049, 20493],
            picture: "https://s3-us-west-2.amazonaws.com/kronolearn/coursePics/logo_JavaScript.png",
            name: "Javascript"

        },
        
        {
            description: "Learn the basics of React!",
            subjects: ["Computers", "Programming", "Web"],
            topics: ["Components", "Webpack", "View"],
            admins: "Kyle",
            students: [83049, 20493],
            picture: "https://s3-us-west-2.amazonaws.com/kronolearn/coursePics/addthis-react-flux-javascript-scaling.png",
            name: "React"

        },
        
        {
            description: "Learn the fundamentals of HTML with this HTML basics course!",
            subjects: ["Computers", "Programming", "Web"],
            topics: ["Elements", "Divs", "<p>"],
            admins: "Kyle",
            students: [83049, 20493],
            picture: "https://s3-us-west-2.amazonaws.com/kronolearn/coursePics/htmlimage.jpeg",
            name: "HTML"

        }
    ];
    
});