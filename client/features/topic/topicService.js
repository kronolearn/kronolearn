var app = angular.module('kronolearn');

app.service('topicService', function($http, $q) {
    
    this.getTopic = function (topicId) {
        var deferred = $q.defer();
        $http.get('/api/topic/' + topicId).then(function (response) {
            deferred.resolve(response.data);
        });
        return deferred.promise;
    }
    
    this.addMaterial = function (material, topicId) {
        return $http.post('/api/topic/material?id=' + topicId, material).then(function(response) {
            return response.data;
        });
    }
    
});