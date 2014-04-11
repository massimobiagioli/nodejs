'use strict';

angular.module('ngRUAApp.controllers', []).
    controller('HomeController', ['$scope',  
        function($scope) {            
        }
    ]).    
    controller('LoginController', ['$scope', '$rootScope', '$location',
        function($scope, $rootScope, $location) {     
    		$scope.username = '';
    		$scope.password = '';
    		$scope.login = function() {
    			//TODO completare ...
    			$rootScope.username = $scope.username;
    			
    			$location.path('/home');
    		};
    	}
    ]).        
    controller('DeviceTypeListController', ['$scope', '$location', 'CRUDModelFactory', 'CRUDControllerFactory',
        function($scope, $location, CRUDModelFactory, CRUDControllerFactory) {                                    
    		angular.extend(this, CRUDControllerFactory.BaseListController('deviceType', $scope, $location, CRUDModelFactory));
        }
    ]).
    controller('DeviceTypeDetailController', ['$scope', '$location', '$routeParams', 'CRUDModelFactory', 'CRUDControllerFactory',
        function($scope, $location, $routeParams, CRUDModelFactory, CRUDControllerFactory) {                            		    		    		    	    
    		$scope.displayName = function() {
    			return $scope.data.name;
    		};    
    		$scope.create = function() {
    	        $scope.data = {};
    	        $scope.data.name = 'xxx';
    	    };
    	    angular.extend(this, CRUDControllerFactory.BaseDetailController('deviceType', $scope, $location, $routeParams, CRUDModelFactory));
        }
    ]);
            