hbvApp.controller('hbvFastaAnalysisAhmedAlessaCtrl', 
		[ '$scope', '$controller', 'glueWS', 'glueWebToolConfig', 'dialogs', '$analytics', 'saveFile', 'FileSaver', '$http', '$window', '$timeout',
		  function($scope, $controller, glueWS, glueWebToolConfig, dialogs, $analytics, saveFile, FileSaver, $http, $window, $timeout) {
			
			addUtilsToScope($scope);

			$scope.analytics = $analytics;
	    	$scope.displaySection = 'summary';
			
			$controller('fileConsumerCtrl', { $scope: $scope, 
				glueWebToolConfig: glueWebToolConfig, 
				glueWS: glueWS, 
				dialogs: dialogs});

			// executed after the project URL is set
			glueWS.addProjectUrlListener( {
				reportProjectURL: function(projectURL) {
				    $scope.uploader.url = projectURL + "/module/hdrReportingController";
				    console.info('uploader.url', $scope.uploader.url);
				}
			});
			
			
		    // CALLBACKS
		    $scope.uploader.onBeforeUploadItem = function(item) {
				var commandObject = {
						"invoke-consumes-binary-function" : {
							"functionName": "reportFastaWeb",
							"argument": [item.file.name]
						}
				};
		    	item.formData = [{command: JSON.stringify(commandObject)}];
		    	item.headers = {"glue-async": "true"};
		    	item.requestStatus = { "code": "UPLOADING" };
		    	item.response = null;
		    	item.commandError = null;
		        console.info('formData', JSON.stringify(item.formData));
		        console.info('onBeforeUploadItem', item);
				$scope.analytics.eventTrack("submitFastaFile", 
						{   category: 'hbvFastaAnalysisAhmedAlessa', 
							label: 'fileName:'+item.file.name+',fileSize:'+item.file.size});


		    };
		    $scope.uploader.onSuccessItem = function(fileItem, response, status, headers) {
		        console.info('onSuccessItem', fileItem, response, status, headers);
				$scope.analytics.eventTrack("hbvFastaAnalysisResult", 
						{  category: 'hbvFastaAnalysisAhmedAlessa', 
							label: 'fileName:'+fileItem.file.name+',fileSize:'+fileItem.file.size });
				fileItem.requestStatus = response;
				console.log("hbvFastaAnalysis.requestStatus initial", response);
				$timeout(function() {
					$scope.updateRequest(fileItem);
				}, 3000);
		    };
		    $scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
		        console.info('onErrorItem', fileItem, response, status, headers);
		    	fileItem.requestStatus = { "code": "COMPLETE" };
				fileItem.commandError = {data: response, status:status, headers:headers, config:response.config} ;
		    };

			$scope.removeAll = function() {
				$scope.uploader.clearQueue();
				$scope.fileItemUnderAnalysis = null;
			}

			$scope.removeItem = function(item) {
				if($scope.fileItemUnderAnalysis == item) {
					$scope.fileItemUnderAnalysis = null;
				}
				item.remove();
			}
		    
			$scope.updateRequest = function(fileItem) {
				var requestID = fileItem.requestStatus.requestID;
				glueWS.getGlueRequestStatus(requestID).then(function onSuccess(response) {
					console.log("hbvFastaAnalysis.requestStatus polled", response.data);
					fileItem.requestStatus = response.data;
					if(fileItem.requestStatus.code == "COMPLETE" && fileItem.response == null && fileItem.commandError == null) {
						glueWS.collectGlueRequestResult(requestID).then(function onSuccess(response) {
							console.log("hbvFastaAnalysis.requestStatus.response async", response.data);
							fileItem.response = response.data;
						}, function onError(response) {
							fileItem.commandError = response;
						});
					} else if (fileItem.requestStatus.code == "QUEUED" || fileItem.requestStatus.code == "RUNNING") { 
						$timeout(function() {
							$scope.updateRequest(fileItem);
						}, 3000);
					}
				}, function onError(response) {
					fileItem.requestStatus = { code: "COMPLETE" };
					fileItem.commandError = response;
				});
			};
			
		    $scope.showAnalysisResults = function(item) {
		    	$scope.setFileItemUnderAnalysis(item);
		    };

		    $scope.showError = function(item) {
				var dlgFunction = glueWS.raiseErrorDialog(dialogs, "executing command");
				dlgFunction(item.commandError.data, item.commandError.status, item.commandError.headers, item.commandError.config);
		    };

		    
		    
		    $scope.setFileItemUnderAnalysis = function(item) {
		    	if(item.sequenceReport == null) {
		    		$scope.setSequenceReport(item, item.response.hdrWebReport.results[0]);
		    	}
		    	$scope.fileItemUnderAnalysis = item;
		    }
		    
		    $scope.setSequenceReport = function(item, sequenceReport) {
		    	item.sequenceReport = sequenceReport;
		    }
		    
			$scope.downloadExampleSequence = function() {
				var url;
				if(userAgent.os.family.indexOf("Windows") == -1) {
					url = "exampleSequences/fullGenome1.fasta";
				} else {
					url = "exampleSequencesMsWindows/fullGenome1.fasta";
				}
				$http.get(url)
				.success(function(data, status, headers, config) {
					console.log("data", data);
			    	var blob = new Blob([data], {type: "text/plain"});
			    	saveFile.saveFile(blob, "example sequence file", "exampleSequenceFile.fasta");
			    })
			    .error(glueWS.raiseErrorDialog(dialogs, "downloading example sequence file"));
			};
		    
			$scope.viewFullReport = function(fileItem, sequenceId, hdrResult) {
				if(fileItem.seqIdToReportUrl == null) {
					fileItem.seqIdToReportUrl = {};
				}
				var reportUrl = fileItem.seqIdToReportUrl[sequenceId];
				var fileName = "hbvReport.html";
				if(reportUrl == null) {
					glueWS.runGlueCommand("module/hdrRasReportTransformer", {
						"transform-to-web-file": {
							"webFileType": "WEB_PAGE",
							"commandDocument":hdrResult,
							"outputFile": fileName
						}
					})
					.success(function(data, status, headers, config) {
						console.info('transform-to-web-file result', data);
						var transformerResult = data.freemarkerDocTransformerWebResult;
						reportUrl = "/glue_web_files/"+transformerResult.webSubDirUuid+"/"+transformerResult.webFileName;
						fileItem.seqIdToReportUrl[sequenceId] = reportUrl;
						$window.open(reportUrl, '_blank');
					})
					.error(glueWS.raiseErrorDialog(dialogs, "rendering full HBV report"));
				} else {
					$window.open(reportUrl, '_blank');
				}
			};

			$scope.getIsHbv = function(sequenceResult) {
				if(sequenceResult.directionStatus == "RESOLVED") {
					if(sequenceResult.direction == "FORWARD") {
						return "Yes";
					} else {
						return "Yes: reverse complement";
					}
				}
				return "No";
			};
				
		    $scope.getGenotype = function(sequenceResult) {
				if(sequenceResult.genotypingStatus == "RESOLVED") {
					return sequenceResult.genotype;
				}
				return "-";
		    };

			
		}]);


