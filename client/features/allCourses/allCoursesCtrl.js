var app = angular.module('kronolearn');


app.controller('allCoursesCtrl', function($scope, allCoursesService, $state) {
    
    $scope.topicsShowing = false;
    
    $scope.coursesearch = undefined;
    
    $scope.getAllCourses = function() {
        allCoursesService.getAllCourses().then(function(response) {
            console.log("This is back-end response", response);
            for (var i = 0; i < response.length; i++) {
                $scope.allCoursesArray.push(response[i]);
            }
        });
    };
    
    
    //runs every time allCoursesCtrl is loaded.
    $scope.getAllCourses();
    
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
            description: "Learn the basics of React!",
            subjects: ["Computers", "Programming", "Web"],
            topics: ["Components", "Webpack", "View"],
            admins: "Kyle",
            students: [83049, 20493],
            picture: "https://s3-us-west-2.amazonaws.com/kronolearn/coursePics/addthis-react-flux-javascript-scaling.png"

        },
        
        {
            name: "HTML",
            description: "Learn the fundamentals of HTML with this HTML basics course!",
            subjects: ["Computers", "Programming", "Web"],
            topics: ["Elements", "Divs", "<p>"],
            admins: "Kyle",
            students: [83049, 20493],
            picture: "https://s3-us-west-2.amazonaws.com/kronolearn/coursePics/htmlimage.jpeg"
            
        },
        
        {
            name: "Spanish Basics",
            description: "Ever wanted to learn Spanish, but just didn't have the time? With this course, you're guaranteed to learn!",
            subjects: ["Spanish, Espanol, Hola"],
            topics: ["Grammar 1", "Grammar 2", "Grammar 3", "Vocabulary 1", "Vocabulary 2", "Culture"],
            admins: "Kyle",
            students: [83049, 20493],
            picture: "https://s3-us-west-2.amazonaws.com/kronolearn/coursePics/Flag_of_Spain.svg.png"
        }
    ];
    
});