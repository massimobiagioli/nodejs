'use strict';

angular.module('ngRUAApp.services', []).
    factory('CRUDModelFactory', ['$http', function($http) {        
        var urlBase = '/api';        
        var username = "unit";
        var password = "Un1t&";                        
        
        var getHeaders = function() {                        
            return {                
                'X-Username': username,
                'X-Password': password
            };                        
        };
        
        var list = function(modelKey) {                        
            var promise = $http.get(urlBase + '/list/' + modelKey, {
                headers: getHeaders()                
            }).then(function(response) {
                return response.data;
            });

            return promise;
        };
        
        var get = function(modelKey, id) {
            var promise = $http.get(urlBase + '/get/' + modelKey + '/' + id, {
                headers: getHeaders()                
            }).then(function(response) {
                return response.data;
            });

            return promise;            
        };
        
        var insert = function(modelKey, model) {
            var promise = $http.post(urlBase + '/insert/' + modelKey, { model: model }, {
                headers: getHeaders(),                
            }).then(function(response) {
                return response.data;
            });

            return promise;            
        };
        
        var update = function(modelKey, model) {
            var promise = $http.put(urlBase + '/update/' + modelKey + '/' + model.id, { model: model }, {
                headers: getHeaders(),                
            }).then(function(response) {
                return response.data;
            });

            return promise;            
        };
        
        var del = function(modelKey, id) {
            var promise = $http.delete(urlBase + '/delete/' + modelKey + '/' + id, {
                headers: getHeaders(),                
            }).then(function(response) {
                return response.data;
            });

            return promise;            
        };
        
        return {
            list: list,
            get: get,
            insert: insert,
            update: update,
            del: del
        };
    }]).
    factory('ControllerHelperFactory', ['CRUDModelFactory', function(CRUDModelFactory) {
    	
    }]);
