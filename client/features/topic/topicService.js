var app = angular.module('kronolearn');

app.service('topicService', function($http, $q) {
    
    this.getTopic = function (topicId) {
        var deferred = $q.defer();
        $http.get('/api/topic/' + topicId).then(function (response) {
            deferred.resolve(response.data);
        });
        return deferred.promise;
    }
    
});