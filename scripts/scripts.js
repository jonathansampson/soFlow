(function () {

	var app = angular.module( "soflow", [ "chart.js" ] );

	app.filter( "toFixed", function () {
		return function ( num ) {
			return num.toFixed(2);
		};
	});

	app.filter( "round", function () {
		return function ( num ) {
			return Math.round( num );
		};
	});

	app.filter( "votes", function ( ) {
		return function ( answers ) {
			return answers.filter(function ( answer ) {
				return answer.score > 0;
			});
		};
	});

	app.filter( "one", function () {
		return function ( qty ) {
			return qty > 1 ? qty : "one";
		};
	});

	app.filter( "owned", function () {
		return function ( posts, user_id ) {
			if ( ! posts ) return [];
			return posts.filter(function ( post ) {
				return post.user_id && post.user_id === user_id
					|| post.owner.user_id === user_id;
			});
		};
	});

	app.filter( "oneOrMany", function () {
		return function ( qty, singular ) {
			return qty === 1 
				? "one " + singular 
				: qty + " " + singular + "s";
		};
	});

	app.filter( "accepted", function () {
		return function ( posts, accepted ) {
			return posts.filter(function ( post ) {
				return post.is_accepted === accepted;
			});
		};
	});

	app.controller( "main", function ( $scope, $http, $interval, $sce ) {

		$scope.data = [ 10, 20 ];
		$scope.users = [];
		$scope.labels = [ "Ten", "Twenty" ];
		$scope.answers = [];
		$scope.topAnswerers = [];

		retrieve_data();
		$interval( retrieve_data, 60000 );

		function retrieve_data () {

			console.log( "Getting fresh data..." );

			$http.get( "../data/users.json?" + Date.now() )
				 .success(function ( data ) {
				 	data.sort(function ( a, b ) {
				 		return a.last_access_date > b.last_access_date ? -1 : 1;
				 	});
				 	data.forEach(function ( user ) {
				 		user.firstname = $sce.trustAsHtml( user.display_name.split(" ")[0] );
				 		user.display_name = $sce.trustAsHtml( user.display_name );
				 	});
				 	$scope.users = data;
				 });

			$http.get( "../data/users.answers.json?" + Date.now() )
				 .success(function ( data ) {
				 	$scope.answers = data;
				 });

			$http.get( "../data/users.comments.json?" + Date.now() )
				 .success(function ( data ) {
				 	data.forEach(function ( comment ) {
				 		comment.body = $sce.trustAsHtml( comment.body );
				 	});
				 	$scope.comments = data;
				 });

			$http.get( "../data/tags.top-answerers.month.json" )
				 .success(function ( data ) {

				 	$scope.data = [];
				 	$scope.labels = [];

				 	data.sort(function ( a, b ) {
				 		return a.score > b.score ? -1 : 1;
				 	});

				 	data.forEach(function ( entry, index ) {
				 		entry.user.display_name = $sce.trustAsHtml( entry.user.display_name );
				 		if ( index > 6 ) return;
				 		$scope.data.push( entry.score );
				 		$scope.labels.push( entry.user.display_name );
				 	});

				 	$scope.topAnswerers = data;

				 });

		}

	});

}());