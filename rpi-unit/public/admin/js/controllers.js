'use strict';

angular.module('ngRUAApp.controllers', []).
	controller('MainController', ['$scope', '$rootScope', '$location',  
	    function($scope, $rootScope, $location) {
			var displayUsername = function() {
				$scope.username = $rootScope.loggedIn ? $rootScope.loginInfo.username : 'guest';
			};
						
			$rootScope.$watch('loggedIn', function() {
				displayUsername();
			});
			
			displayUsername();
			
			$scope.logout = function() {
				$rootScope.loginInfo = {};  
    			$rootScope.loggedIn = false;
				$location.path('/login');
			}
      	}
	]).
	controller('HomeController', ['$scope',  
        function($scope) {            
        }
    ]).    
    controller('LoginController', ['$scope', '$rootScope', '$location', 'LoginFactory',
        function($scope, $rootScope, $location, LoginFactory) {     
    		$scope.username = '';
    		$scope.password = '';
    		$scope.login = function() {    			
    			$rootScope.loginInfo = {};  
    			$rootScope.loggedIn = false;
    			LoginFactory.checkLogin($scope.username, $scope.password).then(function() {                    				
    				$rootScope.loginInfo.username = $scope.username;
    				$rootScope.loginInfo.password = $scope.password;
    				$rootScope.loggedIn = true;
    				$location.path('/home');
		        }, function() {                
		        	bootbox.alert("Username o password errati!");
		        	$scope.username = '';
		        	$scope.password = '';
		        });                    			    			    			
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
    	    };
    	    angular.extend(this, CRUDControllerFactory.BaseDetailController('deviceType', $scope, $location, $routeParams, CRUDModelFactory));
        }
    ]).
    controller('ProgramListController', ['$scope', '$location', 'CRUDModelFactory', 'CRUDControllerFactory',
        function($scope, $location, CRUDModelFactory, CRUDControllerFactory) {                                    
    		angular.extend(this, CRUDControllerFactory.BaseListController('program', $scope, $location, CRUDModelFactory));
        }
    ]).
    controller('ProgramDetailController', ['$scope', '$location', '$routeParams', 'CRUDModelFactory', 'CRUDControllerFactory',
	    function($scope, $location, $routeParams, CRUDModelFactory, CRUDControllerFactory) {                            		    		    		    	    
	  		$scope.displayName = function() {
	  			return $scope.data.name;
	  		};    
	  		$scope.create = function() {
	  	        $scope.data = {};    	        
	  	    };
	  	    
	  	    $scope.loadDeviceTypes = function() {
		        CRUDModelFactory.list("deviceType").then(function(data) {                
		            $scope.deviceTypes = data.result;
		        }, function(err) {                
		        	bootbox.alert(err);
		        });                		    
	  	    };
	  	    
	  	    angular.extend(this, CRUDControllerFactory.BaseDetailController('program', $scope, $location, $routeParams, CRUDModelFactory));
	  	    
	  	    $scope.loadDeviceTypes();
	      }
	]);