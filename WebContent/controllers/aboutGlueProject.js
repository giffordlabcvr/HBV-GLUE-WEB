hbvApp.controller('aboutGlueProjectCtrl', 
		[ '$scope', '$location', '$anchorScroll', 'glueWebToolConfig', '$http', 'glueWS', 'saveFile', 'dialogs',
		function($scope, $location, $anchorScroll, glueWebToolConfig, $http, glueWS, saveFile, dialogs) {

			$scope.analysisToolExampleSequenceURL = glueWebToolConfig.getAnalysisToolExampleSequenceURL();
			$scope.analysisToolExampleMsWindowsSequenceURL = glueWebToolConfig.getAnalysisToolExampleMsWindowsSequenceURL();

			
			$scope.downloadExampleSequence = function() {
				var url;
				if(userAgent.os.family.indexOf("Windows") !== -1) {
					url = $scope.analysisToolExampleMsWindowsSequenceURL;
				} else {
					url = $scope.analysisToolExampleSequenceURL;
				}
				$http.get(url)
				.success(function(data, status, headers, config) {
					console.log("data", data);
			    	var blob = new Blob([data], {type: "text/plain"});
			    	saveFile.saveFile(blob, "example sequence file", "exampleSequenceFile.fasta");
			    })
			    .error(glueWS.raiseErrorDialog(dialogs, "downloading example sequence file"));


			}


		    $scope.scrollTo = function(id) {
		        $location.hash(id);
		        $anchorScroll();
		     }
			
		} ]);
