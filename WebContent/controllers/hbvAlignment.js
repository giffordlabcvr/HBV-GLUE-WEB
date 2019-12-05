hbvApp.controller('hbvAlignmentCtrl', 
		[ '$scope', '$routeParams', '$controller', 'glueWS', 'glueWebToolConfig', 'dialogs',
		  function($scope, $routeParams, $controller, glueWS, glueWebToolConfig, dialogs) {
			addUtilsToScope($scope);

			$controller('alignmentCtrl', { $scope: $scope, 
				glueWebToolConfig: glueWebToolConfig, 
				glueWS: glueWS, 
				dialogs: dialogs});

			$scope.displaySection = 'memberSequences';

			$scope.init($routeParams.alignmentName, 
					"hbvAlignmentRenderer", "sequence.source.name = 'ncbi-curated' and referenceMember = false",
					[
					 "sequence.sequenceID",
                     "alignment.name",
                     "alignment.displayName",
                     "sequence.m49_country.id",
                     "sequence.m49_country.display_name",
					 "sequence.gb_place_sampled",
					 "sequence.collection_year",
                     "sequence.earliest_collection_year",
                     "sequence.latest_collection_year",
					 "sequence.gb_length",
					 "sequence.gb_create_date",
                     "sequence.gb_update_date",
					 "sequence.rotation",
                     "sequence.gb_pubmed_id",
					 "sequence.isolate"
					 ]);
			

			$scope.initGlobalRegionFixedValueSetM49();
			$scope.initDevelopmentStatusFixedValueSetM49();

			$scope.pagingContext.setDefaultSortOrder([
			    { property: "sequence.sequenceID", displayName: "NCBI Nucleotide ID", order: "+" }
			]);
	
			$scope.pagingContext.setSortableProperties([
	            { property:"sequence.sequenceID", displayName: "NCBI Nucleotide ID" },
	            { property:"sequence.gb_create_date", displayName: "NCBI Entry Creation Date" },
	            { property:"sequence.gb_update_date", displayName: "NCBI Last Update Date" },
                { property:"alignment.name", displayName: "Genotype / Subgenotype" },
  	            { property:"sequence.m49_country.id", displayName: "Country of Origin" },
  	            { property:"sequence.earliest_collection_year", displayName: "Earliest Collection Year" },
  	            { property:"sequence.latest_collection_year", displayName: "Latest Collection Year" },
	            { property:"sequence.isolate", displayName: "Isolate ID" },
	            { property:"sequence.host_species", displayName: "Host Species" },
	            { property:"sequence.gb_pubmed_id", displayName: "PubMed ID" },
	            { property:"sequence.gb_length", displayName: "Sequence Length" }
	        ]);

			$scope.pagingContext.setFilterProperties([
           		{ property:"sequence.sequenceID", displayName: "NCBI Nucleotide ID", filterHints: {type: "String"} },
          		{ property:"sequence.gb_length", displayName: "Sequence Length", filterHints: {type: "Integer"} },
                { property:"alignment.displayName", displayName: "Genotype / Subgenotype", filterHints: {type: "String"}  },
                $scope.featurePresenceFilter(),
  	            { property:"sequence.m49_country.display_name", nullProperty:"sequence.m49_country", altProperties:["sequence.m49_country.id"], displayName: "Country of Origin", filterHints: {type: "String"} },
  	            $scope.globalRegionFilterM49(),
  	            $scope.developmentStatusFilterM49(),
          		{ property:"sequence.gb_create_date", displayName: "NCBI Entry Creation Date", filterHints: {type: "Date"} },
          		{ property:"sequence.gb_update_date", displayName: "NCBI Last Update Date", filterHints: {type: "Date"} },
  	            { property:"sequence.gb_place_sampled", displayName: "Place Sampled", filterHints: {type: "String"} },
  	            { property:"sequence.host_species", displayName: "Host Species", filterHints: {type: "String"} },
	            { property:"sequence.gb_pubmed_id", displayName: "PubMed ID", filterHints: {type: "String"}  },
  	            { property:"sequence.isolate", displayName: "Isolate ID", filterHints: {type: "String"} },
	            { property:"sequence.earliest_collection_year", displayName: "Earliest Collection Year", filterHints: {type: "Integer"} },
	            { property:"sequence.latest_collection_year", displayName: "Latest Collection Year", filterHints: {type: "Integer"} }

  			]);

			$scope.pagingContext.setDefaultFilterElems([]);

			
		}]);