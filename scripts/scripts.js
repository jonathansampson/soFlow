(function () {

	var app = angular.module( "soflow", [] );

	app.controller( "main", function ( $scope, $http ) {

		$scope.title = "hello, world";

		$scope.staff = [];

		$http.get( "../data/staff.json" ).success(function ( data ) {
			$scope.staff = data;
		});

	});

}());