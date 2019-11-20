projectBrowser.controller('hbvSequenceCtrl', 
		[ '$scope', '$routeParams', '$controller',
		    function($scope, $routeParams, $controller) {

			addUtilsToScope($scope);

			$scope.sourceName = $routeParams.sourceName;
			$scope.sequenceID = $routeParams.sequenceID;
			$scope.glueObjectPath = "sequence/"+$scope.sourceName+"/"+$scope.sequenceID;
		
			$controller('renderableObjectBaseCtrl', { 
				$scope: $scope, 
				glueObjectPath: $scope.glueObjectPath,
				rendererModule: "hbvSequenceRenderer"
			});	
			
			$scope.renderGlobalRegion = function(sequence) {
				if(sequence.m49_region == null) {
					return "-";
				}
				var result = sequence.m49_region_display_name;
				if(sequence.m49_sub_region) {
					result = result + " / " + sequence.m49_sub_region_display_name;
					if(sequence.m49_intermediate_region) {
						result = result + " / " + sequence.m49_intermediate_region_display_name;
					}
				}
				return result;
			}

			$scope.renderDevelopmentStatus = function(sequence) {
				if(sequence.country_development_status == null) {
					return "-";
				}
				var result = "";
				if(sequence.country_development_status == 'developing') {
					result = result + "Developing country";
					if(sequence.country_is_ldc) {
						result = result + " / Least developed country"
					}
					if(sequence.country_is_lldc) {
						result = result + " / Landlocked developing country"
					}
					if(sequence.country_is_sids) {
						result = result + " / Small island developing state"
					}
				}
				if(sequence.country_development_status == 'developed') {
					result = result + "Developed country";
				}
				return result;
			}


			
		}]);
