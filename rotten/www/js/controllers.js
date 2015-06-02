angular.module('rottenManager.controllers', [])
    .controller('MainCtrl', ['$scope', function ($scope) {
        $scope.status = "It works!";
    }])
    .controller('NewGameCtrl', ['$scope', function ($scope) {
        $scope.jugadores =[{}];
		$scope.agregarJugador = function(){
			$scope.jugadores.push($scope.jugador);
			$scope.jugador = "";
			};
    }]);
