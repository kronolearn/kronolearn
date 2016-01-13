var app = angular.module('kronolearn');


app.service('quizService', function($http) {
    
    this.getCardInfo = function(topicId) {
        return $http.get('/api/topic/' + topicId).then(function(response){
            //console.log("This is CARD response in cardService: ", response);
            return response.data;
        })
    };
});