angular.module('rottenManager.controllers', [])
    .controller('MainCtrl', ['$scope', function ($scope) {
        $scope.status = "It works!";
    }])
    .controller('ConfigCtrl', ['$scope', function ($scope) {
        $scope.configutacion = {cantidadMazos: 2, valorBonificacion:10, valorPenalizacion: 10 };
    }])
    .controller('NewGameCtrl', ['$scope', '$location', 'juego', function ($scope,$location,juego) {
		$scope.agregarJugador = function(){
            try {
                juego.agregarJugador(new Jugador($scope.jugador.nombre));
            }catch(e){
                console.log(e);
            }
			$scope.jugador = "";
			};
        $scope.quitarJugador = function(jugador){
            try {
                juego.quitarJugador(jugador);
            }catch(e){
                console.log(e);
            }

        };
        $scope.getJugadores = function(){
            return juego.jugadores;
        }

    }]);
