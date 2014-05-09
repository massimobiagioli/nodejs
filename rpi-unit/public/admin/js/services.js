'use strict';

angular.module('ngRUAApp.services', []).
	factory('GlobalSettings', function() {
		return {
			services: {
				urlBase: '/api'
			}
		}
	}).
	factory('CRUDControllerFactory', function() {
		var BaseListController = function BaseListController(modelKey, $scope, $location, CRUDModelFactory, args) {                        
		    $scope.list = function() {
		        CRUDModelFactory.list(modelKey, args).then(function(data) {                
		            $scope.data = data.result;
		        }, function(err) {                
		        	bootbox.alert(err);
		        });                
		    };
		    
		    $scope.prepareForCreate = function() {
		        $location.path('/' + modelKey + 'Detail/create');
		    };
		    
		    $scope.list();    		    		
		};
		
		var BaseDetailController = function(modelKey, $scope, $location, $routeParams, CRUDModelFactory) {
		    var navigateToList = function() {
		        $location.path('/' + modelKey + 'List');
		    };                       
		    
		    $scope.get = function(id) {
		        CRUDModelFactory.get(modelKey, id).then(function(data) {                
		            $scope.data = data.result;
		        }, function(err) {                
		        	bootbox.alert(err);
		        });                
		    };
		    
		    $scope.ok = function() {
		        if ('create' === $scope.action) {
		            CRUDModelFactory.insert(modelKey, $scope.data).then(function(result) {                
		                $scope.lastInsertId = result;
		                navigateToList();
		            }, function(err) {                
		            	bootbox.alert(err);
		            }); 
		        } else if ('edit' === $scope.action) { 
		            CRUDModelFactory.update(modelKey, $scope.data).then(function(result) {                                        
		                navigateToList();
		            }, function(err) {                
		            	bootbox.alert(err);
		            });  
		        }                   
		    };
		    
		    $scope.del = function() {                
				bootbox.dialog({
					message : "Cancellare " + $scope.displayName() + "?",
					title : "Conferma cancellazione",
					buttons : {
						ok : {
							label : "Si",
							className : "btn-success",
							callback : function() {
								CRUDModelFactory.del(modelKey, $scope.data.id).then(function(result) {                
				                	navigateToList();
				                }, function(err) {                
				                	bootbox.alert(err);
				                });                                    
							}
						},
						cancel : {
							label : "No",
							className : "btn-default",
							callback : function() {	}
						}						
					}
				});            	            	
		    };
		    
		    $scope.cancel = function() {               
		    	navigateToList();
		    };
		                
		    $scope.action = $routeParams.action;
		                
		    if ('create' === $scope.action) {
		        $scope.create();
		    } else if ('edit' === $scope.action) {                
		        $scope.get($routeParams.id);           
		    }                        
		};
		
		return {
			BaseListController: BaseListController,
			BaseDetailController: BaseDetailController
		};
	}).
    factory('CRUDModelFactory', ['$http', '$rootScope', '$q', 'GlobalSettings', function($http, $rootScope, $q, GlobalSettings) {                                
        var getHeaders = function() {                        
            var getUsername = function() {
            	return $rootScope.loginInfo ? $rootScope.loginInfo.username : "";
            };
            var getPassword = function() {
            	return $rootScope.loginInfo.password ? $rootScope.loginInfo.password : "";
            };
        	return {                
                'X-Username': getUsername(),
                'X-Password': getPassword()
            };                        
        };
        
        var list = function(modelKey, data) {                        
        	var args = {};
        	args.headers = getHeaders();
        	if (null != data) {
        		args.data = data;
        	}
        	
        	var deferred = $q.defer(),    	
        		promise = $http.get(GlobalSettings.services.urlBase + '/list/' + modelKey, args).then(function(response) {
	            	deferred.resolve(response.data);
	            }, function(err) {
	            	deferred.reject(err.data.error);
	            });
       
            return deferred.promise;     
        };
        
        var get = function(modelKey, id) {
        	var deferred = $q.defer(),
        		promise = $http.get(GlobalSettings.services.urlBase + '/get/' + modelKey + '/' + id, {
	                headers: getHeaders()                
	            }).then(function(response) {
	            	deferred.resolve(response.data);
	            }, function(err) {
	            	deferred.reject(err.data.error);
	            });
       
            return deferred.promise;           
        };
        
        var insert = function(modelKey, model) {
        	var deferred = $q.defer(),
        		promise = $http.post(GlobalSettings.services.urlBase + '/insert/' + modelKey, { model: model }, {
	                headers: getHeaders(),                
	            }).then(function(response) {
	            	deferred.resolve(response.data);
	            }, function(err) {
	            	deferred.reject(err.data.error);
	            });

        	return deferred.promise;            
        };
        
        var update = function(modelKey, model) {
        	var deferred = $q.defer(),        	        	
        		promise = $http.put(GlobalSettings.services.urlBase + '/update/' + modelKey + '/' + model.id, { model: model }, {
	                headers: getHeaders(),                
	            }).then(function(response) {
	            	deferred.resolve(response.data);
	            }, function(err) {
	            	deferred.reject(err.data.error);
	            });
       
            return deferred.promise;            
        };
        
        var del = function(modelKey, id) {
        	var deferred = $q.defer(),        	
        		promise = $http.delete(GlobalSettings.services.urlBase + '/delete/' + modelKey + '/' + id, {
	                headers: getHeaders(),                
	            }).then(function(response) {
	            	deferred.resolve(response.data);
	            }, function(err) {
	            	deferred.reject(err.data.error);
	            });

        	return deferred.promise;             
        };
        
        return {
            list: list,
            get: get,
            insert: insert,
            update: update,
            del: del
        };
    }]).
    factory('LoginFactory', ['$http', 'GlobalSettings', function($http, GlobalSettings) {        	    	
    	var checkLogin = function(username, password) {                		
    		var promise = $http.get(GlobalSettings.services.urlBase + '/checkLogin', {
            	headers: {
            		'X-Username': username,
                    'X-Password': password
                }                
            }).then(function(response) {
                return response.data;
            });

            return promise;            
        };
        
    	return {
    		checkLogin: checkLogin
    	};
    }]);
