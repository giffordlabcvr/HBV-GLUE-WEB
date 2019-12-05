projectBrowser.controller('hbvSequencesCtrl', 
		[ '$scope', 'glueWebToolConfig', 'glueWS', '$controller', 'dialogs', 
		    function($scope, glueWebToolConfig, glueWS, $controller, dialogs) {

			$controller('sequencesCtrl', { $scope: $scope, 
				glueWebToolConfig: glueWebToolConfig, 
				glueWS: glueWS, 
				dialogs: dialogs});

			console.log("initializing hbv sequences");

			$scope.init("source.name = 'ncbi-curated'", 
					["source.name",
					 "sequenceID",
                     "m49_country.id",
                     "m49_country.display_name",
					 "gb_place_sampled",
					 "collection_year",
                     "earliest_collection_year",
                     "latest_collection_year",
					 "gb_length",
					 "gb_create_date",
                     "gb_update_date",
					 "rotation",
                     "gb_pubmed_id",
					 "isolate"] );
			
			$scope.initGlobalRegionFixedValueSetM49();
			$scope.initDevelopmentStatusFixedValueSetM49();

			
			$scope.pagingContext.setDefaultSortOrder([
  			    { property: "sequenceID", displayName: "NCBI Nucleotide ID", order: "+" }
  			]);

  			
			$scope.pagingContext.setSortableProperties([
	            { property:"sequenceID", displayName: "NCBI Nucleotide ID" },
	            { property:"gb_create_date", displayName: "NCBI Entry Creation Date" },
	            { property:"gb_update_date", displayName: "NCBI Last Update Date" },
  	            { property:"m49_country.id", displayName: "Country of Origin" },
  	            { property:"earliest_collection_year", displayName: "Earliest Collection Year" },
  	            { property:"latest_collection_year", displayName: "Latest Collection Year" },
	            { property:"isolate", displayName: "Isolate ID" },
	            { property:"host_species", displayName: "Host Species" },
	            { property:"gb_pubmed_id", displayName: "PubMed ID" },
	            { property:"gb_length", displayName: "Sequence Length" }
	        ]);

			$scope.pagingContext.setFilterProperties([
           		{ property:"sequenceID", displayName: "NCBI Nucleotide ID", filterHints: {type: "String"} },
          		{ property:"gb_length", displayName: "Sequence Length", filterHints: {type: "Integer"} },
          		{ property:"gb_create_date", displayName: "NCBI Entry Creation Date", filterHints: {type: "Date"} },
          		{ property:"gb_update_date", displayName: "NCBI Last Update Date", filterHints: {type: "Date"} },
	            { property:"earliest_collection_year", displayName: "Earliest Collection Year", filterHints: {type: "Integer"} },
	            { property:"latest_collection_year", displayName: "Latest Collection Year", filterHints: {type: "Integer"} },
  	            { property:"m49_country.display_name", nullProperty:"m49_country", altProperties:["m49_country.id"], displayName: "Country of Origin", filterHints: {type: "String"} },
  	            $scope.globalRegionFilterM49(),
  	            $scope.developmentStatusFilterM49(),
  	            { property:"gb_place_sampled", displayName: "Place Sampled", filterHints: {type: "String"} },
  	            { property:"host_species", displayName: "Host Species", filterHints: {type: "String"} },
  	            { property:"patent_related", displayName: "Patent-related?", filterHints: {type: "Boolean"} },
	            { property:"gb_pubmed_id", displayName: "PubMed ID", filterHints: {type: "String"}  },
  	            { property:"isolate", displayName: "Isolate ID", filterHints: {type: "String"} },
  			]);

  			$scope.pagingContext.setDefaultFilterElems([]);
			
			
}]);
