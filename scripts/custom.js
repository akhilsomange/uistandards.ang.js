var app = angular.module('uiStandards',[]);


app.controller('HtmlListController', function($scope , $http,$timeout){
	
	$scope.currentItem;
	$scope.initialize = function(data,status){
		
		$scope.elements = data;

		$timeout(function(){
			var x = $('.menu > ul').hide();
			$('.menu h3').click(function(){
				$(x).slideUp('600');
				$(this).next().slideDown('600');
			});
		});
	
	}

	$http.get('/scripts/htmlelements.json').success($scope.initialize).error(function(error){
		console.log(error.message);
	});

	$scope.updateShowcase = function(item,heading){
		$scope.currentItem = item;
		$scope.parentItem =  heading;
		//removing style attributes
		$("[class^='col']").removeAttr('style'); 
	}


});
app.directive('layoutDirective',function(){
	return {
		restrict:'A',
		templateUrl:'/scripts/templates/layout.html',
		link:function($scope){
			$scope.$watch("currentItem.id", function(newid){
				//adding inline height for circles(id for circles =7)
				if(newid == 7){
					radiusEnabled = true;
					var numItems = $(".radius > [class^='col']").size();
					var numItemWidth = $(".radius > [class^='col']").width();
					$(".radius > [class^='col']").height(numItemWidth);
					radiusHeight = numItemWidth;
					$(window).resize(function(){
						var numItems = $(".radius > [class^='col']").size();
						var numItemWidth = $(".radius > [class^='col']").width();
						$(".radius > [class^='col']").height(numItemWidth);
					});
				}
			})
			
		}
	}
});


app.directive('messagesDirective',function(){
	return{
		restrict: 'A',
		templateUrl:'/scripts/templates/messages.html'
	}

});
app.directive('buttonDirective',function(){
	return{
		restrict: 'A',
		templateUrl:'/scripts/templates/buttons.html'
	}

});
app.directive('iconDirective',function(){
	return{
		restrict: 'A',
		templateUrl:'/scripts/templates/icons.html'
	}

});


app.directive('output',function(){

	return {
		restrict: 'A',
		link:function($scope,$element,$attrs){
			$scope.$watch('currentItem.id',function(id){
				//filter out and remove unwanted angular directives and inline attributes
				 	if(typeof id != "undefined"){
					 	var clipboard1 = $element.children().html();
					 	clipboard1 = clipboard1.replace(/<!--[^>]*-->/g,''); //to remove html comments (due to ng-if directive)
					 	clipboard1 = clipboard1.replace(/ng-[a-zA-Z]*=".*"/g,'');//to remove angular attributes like ng-if=""
					 	clipboard1 = clipboard1.replace(/ng-[a-zA-Z]*/,''); //to remove angular classes like ng-scope
					 	$("#"+$attrs.output).html(clipboard1);
					 }
			})
	
		}
	}
});