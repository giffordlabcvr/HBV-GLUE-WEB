hbvApp.controller('versionInfoCtrl', 
		[ '$scope', 'glueWS', 'dialogs', 
		function($scope, glueWS, dialogs) {

			glueWS.runGlueCommand("", {
			    "glue-engine":{
			        "show-version":{}
			    }
			})
			.success(function(data, status, headers, config) {
				$scope.glueEngineVersion = data.glueEngineShowVersionResult.glueEngineVersion;
			})
			.error(glueWS.raiseErrorDialog(dialogs, "retrieving GLUE engine version"));
			
			glueWS.runGlueCommand("", {
			    "show":{
			        "setting":{
			            "settingName":"project-version"
			        }
			    }
			})
			.success(function(data, status, headers, config) {
				$scope.hbvGlueProjectVersion = data.projectShowSettingResult.settingValue;
			})
			.error(glueWS.raiseErrorDialog(dialogs, "retrieving project-version setting"));


			glueWS.runGlueCommand("", {
			    "show":{
			        "extension-setting":{
			            "extensionName":"ncbi_hbv",
				        "extSettingName":"extension-version"
			        }
			    }
			})
			.success(function(data, status, headers, config) {
				$scope.ncbiHbvGlueExtensionProjectVersion = data.projectShowExtensionSettingResult.extSettingValue;
			})
			.error(glueWS.raiseErrorDialog(dialogs, "retrieving ncbi_hbv extension-version setting"));

			glueWS.runGlueCommand("", {
			    "show":{
			        "extension-setting":{
			            "extensionName":"ncbi_hbv",
			            "extSettingName":"extension-build-date"
			        }
			    }
			})
			.success(function(data, status, headers, config) {
				$scope.ncbiHbvGlueExtensionBuildDate = data.projectShowExtensionSettingResult.extSettingValue;
			})
			.error(glueWS.raiseErrorDialog(dialogs, "retrieving ncbi_hbv extension-build-date setting"));

			glueWS.runGlueCommand("", {
			    "show":{
			        "extension-setting":{
			            "extensionName":"ncbi_hbv",
			            "extSettingName":"extension-build-id"
			        }
			    }
			})
			.success(function(data, status, headers, config) {
				$scope.ncbiHbvGlueExtensionBuildId = data.projectShowExtensionSettingResult.extSettingValue;
			})
			.error(glueWS.raiseErrorDialog(dialogs, "retrieving ncbi_hbv extension-build-id setting"));

			
		} ]);
