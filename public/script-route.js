	// create the module and name it scotchApp
	var myApp = angular.module('myApp', ['ngRoute']);

	// configure our routes
	myApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'views/home.html',
				controller  : 'mainController'
			})

			// route for the about page
			.when('/admin', {
				templateUrl : 'views/admin.html',
				controller  : 'adminController'
			})

			.when('/error', {
				templateUrl : 'views/error.html',
				controller  : 'errorController'
			})

			// route for the contact page
			.when('/view', {
				templateUrl : 'views/view.html',
				controller  : 'viewController'
			});
	});

	myApp.controller('mainController', function($scope, $interval,$location) {
		$scope.login;
		$scope.logins = function(val){

			if(val.userid=="admin@admin.com" && val.password=="admin"){
			if(val.type=="admin"){
				$location.url("admin");
			}else if(val.type=="view"){
				$location.url("view");
			}
		}else{
			$location.url("error");
		}
		};
	});

	myApp.controller('adminController', function($scope,  $location,$interval) {
		var socket = io();
			$scope.values={};
			$scope.valueslist=[];
			$scope.submitvalues=function(){
				console.log($scope.values);
				$scope.valueslist.push($scope.values);
				$scope.$apply();
				socket.emit('chat message', $scope.valueslist);
				$scope.values=null;
				return false;
			};
	});

	myApp.controller('errorController', function($scope) {
		
	});

	myApp.controller('viewController', function($scope,$rootScope) {
		var socket = io();
		$scope.messagelist=[];
		$scope.name="kirana";
      socket.on('chat message', function(msg){
        $scope.messagelist=msg;
        $scope.$apply()
      });
	});