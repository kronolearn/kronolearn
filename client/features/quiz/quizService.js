var app = angular.module('kronolearn');


app.service('quizService', function($http) {
    
    this.getCardInfo = function(topicId) {
        return $http.get('/api/topic/' + topicId).then(function(response){
            //console.log("This is CARD response in cardService: ", response);
            return response.data;
        })
    };
    
    this.addNewCard = function(cardObj, userId) {
        var fullObj = {
            cardObj: cardObj,
            _id: userId
        }
        return $http.put('/api/usercard', fullObj).then(function(response) {
            console.log(response);
            return response.data;
        })
    };
    
    this.updateCard = function(reviewObj, userId) {
        var fullObj = {
            reviewObj: reviewObj,
            _id: userId
        }
        return $http.put('/api/updateusercard', fullObj).then(function(response) {
            console.log('updateUserCard service response: ', response);
            return response.data;
        })
    }
    
    this.getUserInfo = function(userId) {
        return $http.get('/api/user/' + userId).then(function(response){
            return response.data;
        })
    };
});