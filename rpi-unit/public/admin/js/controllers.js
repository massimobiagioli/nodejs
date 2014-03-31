'use strict';

angular.module('ngRUAApp.controllers', []).
    controller('HomeController', ['$scope',  
        function($scope) {            
        }
    ]).
    controller('DeviceTypeListController', ['$scope', '$location', 'CRUDModelFactory', 
        function($scope, $location, CRUDModelFactory) {                        
            var modelKey = 'deviceType';
            
            $scope.list = function() {
                CRUDModelFactory.list(modelKey).then(function(data) {                
                    $scope.data = data.result;
                }, function(err) {                
                	bootbox.alert(err);
                });                
            };
            
            $scope.prepareForCreate = function() {
                $location.path('/deviceTypeDetail/create');
            };
            
            $scope.list();            
        }
    ]).
    controller('DeviceTypeDetailController', ['$scope', '$location', '$routeParams', 'CRUDModelFactory', 
        function($scope, $location, $routeParams, CRUDModelFactory) {                        
            var modelKey = 'deviceType';

            var navigateToList = function() {
                $location.path('/deviceTypeList');
            };                       
            
            $scope.get = function(id) {
                CRUDModelFactory.get(modelKey, id).then(function(data) {                
                    $scope.data = data.result;
                }, function(err) {                
                	bootbox.alert(err);
                });                
            };
            
            $scope.create = function() {
                $scope.data = {};
                $scope.data.name = '';
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
					message : "Cancellare " + $scope.data.name + "?",
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
        }
    ]);
            