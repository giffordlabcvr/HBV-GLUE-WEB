	  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','https:www.google-analytics.com/analytics.js','ga');
	
	  console.log("document.location.hostname", document.location.hostname);
	  var trackingID;
	  if(document.location.hostname.indexOf("hbv-glue.gla.cvr.ac.uk") >= 0) {
		  // HBV-GLUE production analytics account
		  trackingID = 'UA-147656992-1';
		  ga('create', trackingID, 'auto');
	  } else {
		  // sandbox analytics account
		  trackingID = 'UA-93752139-1';
		  ga('create', trackingID, 'none');
	  }

var hbvApp = angular.module('hbvApp', [
    'ngRoute',
    'projectBrowser', 
    'angularFileUpload', 
    'home',
    'glueWS',
    'glueWebToolConfig',
    'treeControl',
    'angulartics',
    'angulartics.google.analytics',
    'angular-cookie-law',
    'hljs',
    'rzModule'
  ]);

console.log("after hbvApp module definition");

hbvApp.config(['$routeProvider', 'projectBrowserStandardRoutesProvider',
  function($routeProvider, projectBrowserStandardRoutesProvider) {
	
	var projectBrowserStandardRoutes = projectBrowserStandardRoutesProvider.$get();
	var projectBrowserURL = "../gluetools-web/www/projectBrowser";
    $routeProvider.
    when('/hbvFastaAnalysis', {
      templateUrl: '../views/hbvFastaAnalysis.html',
      controller: 'hbvFastaAnalysisCtrl'
    }).
    when('/home', {
  	  templateUrl: './modules/home/home.html',
  	  controller: 'homeCtrl'
    }).
    otherwise({
  	  redirectTo: '/home'
    });

}]);

hbvApp.controller('hbvAppCtrl', 
  [ '$scope', 'glueWS', 'glueWebToolConfig',
function ($scope, glueWS, glueWebToolConfig) {
	$scope.brand = "HBV-GLUE";
	$scope.homeMenuTitle = "Home";
	$scope.analysisMenuTitle = "Analysis";
	$scope.analysisToolMenuTitle = "Genotyping and sequence interpretation";
	glueWS.setProjectURL("../../../gluetools-ws/project/hbv");
	glueWS.setAsyncURL("../../../gluetools-ws");
	glueWebToolConfig.setAnalysisToolURL("../gluetools-web/www/analysisTool");
	glueWebToolConfig.setProjectBrowserURL("../gluetools-web/www/projectBrowser");
	glueWebToolConfig.setGlueWSURL("../gluetools-web/www/glueWS");
} ]);


