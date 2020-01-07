	  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','https:www.google-analytics.com/analytics.js','ga');
	
	  console.log("document.location.hostname", document.location.hostname);
	  var trackingID;
	  if(document.location.hostname.indexOf("hbv-glue.cvr.gla.ac.uk") >= 0) {
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
	// custom single alignment view
	$routeProvider.
    when('/project/reference/:referenceName', {
	  templateUrl: 'views/hbvReference.html',
	  controller: 'hbvReferenceCtrl'
    });
    // custom alignments view
	$routeProvider.
    when('/project/alignment', {
  	  templateUrl: 'views/hbvAlignments.html',
  	  controller: 'hbvAlignmentsCtrl'
      });
	// custom single alignment view
	$routeProvider.
    when('/project/alignment/:alignmentName', {
	  templateUrl: 'views/hbvAlignment.html',
	  controller: 'hbvAlignmentCtrl'
    });
    // custom sequences view
	$routeProvider.
    when('/project/sequence', {
  	  templateUrl: 'views/hbvSequences.html',
  	  controller: 'hbvSequencesCtrl'
      });
	// custom single sequence view
	$routeProvider.
    when('/project/sequence/:sourceName/:sequenceID', {
	  templateUrl: 'views/hbvSequence.html',
	  controller: 'hbvSequenceCtrl'
    });

	
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

	$routeProvider.
    when('/hbvFastaAnalysisAhmedAlessa', {
      templateUrl: '../views/hbvFastaAnalysisAhmedAlessa.html',
      controller: 'hbvFastaAnalysisAhmedAlessaCtrl'
    });

    $routeProvider.
    when('/aboutGlueProject', {
  	  templateUrl: './views/aboutGlueProject.html',
  	  controller: 'aboutGlueProjectCtrl'
    }).
    when('/versionInfo', {
  	  templateUrl: './views/versionInfo.html',
  	  controller: 'versionInfoCtrl'
    });
    
    $routeProvider.
    when('/howToCite', {
  	  templateUrl: './modules/home/howToCite.html',
  	  controller: 'howToCiteCtrl'
    }).
    otherwise({
  	  redirectTo: '/home'
    });

    $routeProvider.
    when('/team', {
  	  templateUrl: './modules/home/team.html',
  	  controller: 'teamCtrl'
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
	$scope.analysisToolMenuTitle = "Genotyping and Interpretation";
	$scope.projectBrowserMenuTitle = "Sequence Data";
	$scope.projectBrowserAlignmentMenuTitle = "NCBI Sequences by Clade";
	$scope.projectBrowserSequenceMenuTitle = "All NCBI Sequences";
	$scope.glueProjectMenuTitle = "Offline version";
	$scope.aboutHbvGlueMenuTitle = "About";
	$scope.aboutMenuTitle = "About";
	$scope.teamTitle = "The HBV-GLUE team";
	$scope.versionInfoTitle = "Version information";
	$scope.howToCiteTitle = "How to cite";
	glueWS.setProjectURL("../../../gluetools-ws/project/hbv");
	glueWS.setAsyncURL("../../../gluetools-ws");
	glueWebToolConfig.setAnalysisToolURL("../gluetools-web/www/analysisTool");
	glueWebToolConfig.setAnalysisToolExampleSequenceURL("exampleSequences/fullGenome1.fasta");
	glueWebToolConfig.setAnalysisToolExampleMsWindowsSequenceURL("exampleSequencesMsWindows/fullGenome1.fasta");
	glueWebToolConfig.setProjectBrowserURL("../gluetools-web/www/projectBrowser");
	glueWebToolConfig.setGlueWSURL("../gluetools-web/www/glueWS");
} ]);


