angular.module('kronolearn').service('createQuizService', function($http) {
    
    this.getTopic = function(topicId) {
        return $http.get('/api/topic/' + topicId).then(function(response) {
            return response.data;
        })
    };
    
});