
  var app = angular.module('myapp',['ngRoute']);
  app.config(['$routeProvider',function($routeProvider){
      $routeProvider
      .when('/men',  {templateUrl:"men",controller:"menctrl"})
      .when('/women',  {templateUrl:"women"})
      .when('/productInformation/:productId', {templateUrl:"productInformation",controller:"productctrl"})
      .when('/showBagItems',  {templateUrl:"showBagItems",controller:"bagitemctrl"})
  }]); 
  app.run(function($rootScope){
	  $rootScope.itemLength = 0;
  });
  app.controller('myctrl', ['$scope' ,function($scope) {
	  $scope.hh="block";
	  $scope.ngviewdisplay = "none";
	  $scope.carouselHidingFunction = function() {
	        $scope.hh="none";
	        $scope.ngviewdisplay = "block";
	    };
	    $scope.reloadRoute = function() {
	    	$scope.hh="block";
	    	$scope.ngviewdisplay = "none";
	    	};
	   }]);
  app.controller('bagitemctrl',function($rootScope,$scope,$routeParams,$http,$location,$route){
	  $scope.showBagItems = function(){
		    $scope.hh="none";
	        $scope.ngviewdisplay = "block";
		  console.log("you clicked on show items bag");
	    }; 
	    	 $http({
	             url: '/showCartItems',
	             method: 'GET',
	             params: {'sessionId':"ravi"} 
	          })
	   	    .then(function(response) {
	   	    	 console.log(response);
	   	         $scope.bagItems = JSON.parse(response.data.records);
	   	         $scope.total = 0;
	   	         $scope.itemsLength = Object.keys($scope.bagItems.items).length;
	   	         $rootScope.itemLength = $scope.itemsLength;
	   	         angular.forEach($scope.bagItems.items, function(value, key) {
	   	        	 angular.forEach(value,function(value1,key1){
	   	        		 if(key1 == 'up')
	   	        		    $scope.total += value1;
	   	        	 })
	   	    	});
	   	         
	   	         $scope.selectButton = "none";
	   	         $scope.hideSelect = function(){
	   	        	 $scope.selectButton = "none"; 
	   	         }
	   	         $scope.editButton = function(){
	   	        	 $scope.selectButton = "block";
	   	         }
	   	         $scope.saveNewUpdatedItem = function(itemid,qty){
	   	        	 console.log(itemid[3]+"   "+qty);
	   	        	$http({
		   	             url: '/updateItem',
		   	             method: 'GET',
		   	             params: {productId:itemid[3],qty:qty} 
		   	          })
		   	   	    .then(function(response) {
		   	   	    	console.log(response);
		   	   	    	$route.reload();
		   	   	    }, function(error) {
		   	   	        console.log("Something went wrong on updating item");
		   	   	    });
	   	        	 
	   	         }
	   	         $scope.removeItem = function(productId){
	   	        	 console.log(productId);
	   	        	$http({
	   	             url: '/removeItem',
	   	             method: 'GET',
	   	             params: {productId:productId[3]} 
	   	          })
	   	   	    .then(function(response) {
	   	   	     console.log(response);
	   	   	     $rootScope.itemLength -= 1;
		    	console.log("itemLength---"+$rootScope.itemLength);
	   	   	    	$route.reload();
	   	   	    }, function(error) {
	   	   	        console.log("Something went wrong for deleting item");
	   	   	    });
	   	        	 
	   	         }
	   	    }, function(error) {
	   	        console.log("Something Went Wrong For Showing Bag Items");
	   	    });
  });
  app.controller('productctrl',function($rootScope ,$scope,$routeParams,$http,$location){
      $scope.proid = $routeParams.productId[3];
      $http({
          url: '/getItem',
          method: 'GET',
          params: {productId:$scope.proid} 
       })
	    .then(function(response) {
	    	console.log(response);
	    	$scope.product = JSON.parse(response.data.record);
	    }, function(error) {
	        console.log("Something went wrong");
	    });
	  $scope.menItemClickFunction = function(){
		  console.log("you clicked on this button");
	  };
	  $scope.selectedSizeValue = 0;
	  $scope.validateAndAdd = function(recievedProductId){
		  if($scope.selectedSizeValue == 0){
			  $("#span").tooltip('show');
		  console.log("size is not selected");
		  }else{
			  console.log(recievedProductId);
			  $http({
		          url: '/addToCart',
		          method: 'GET',
		          params: {itemid:recievedProductId,size:$scope.selectedSizeValue,qty:1,sessionid:"ravi"} 
		       })
			    .then(function(response) {
			    	console.log(response);
			    	$rootScope.itemLength += 1;
			    	console.log("itemLength---"+$rootScope.itemLength);
			    	$location.path('/men');
			    }, function(error) {
			        console.log("Something went wrong for inserting item into db");
			    });
		  }
	  }
	  $scope.setValueOfInput = function(s){
		  console.log(s);
		  $scope.selectedSizeValue = s;
		  $("#span").tooltip('hide');
	  }
  });
  app.controller('menctrl', function($scope,$http) {
	
	  $http({
          url: '/',
          method: 'GET',
          params: {type:"menButton"} 
       })
	    .then(function(response) {
	        $scope.itemList = JSON.parse(response.data.records);
	    }, function(error) {
	        console.log("Something went wrong for fetching data for mens page");
	    });
	});
  
  app.directive('tooltip', function(){
	    return {
	        restrict: 'A',
	        link: function(scope, element, attrs){
	            $(element).focus(function(){
	                // on mouseenter
	                $(element).tooltip('hide');
	            }, function(){
	                // on mouseleave
	                $(element).tooltip('hide');
	            });
	        }
	    };
	});