angular.module('rottenManager.controllers', [])
    .controller('ManosCtrl', ['$scope', 'juego',function ($scope,juego) {

        $scope.recalcularDefaultManos = function(){
            var ms = [];
            var cMaxMano = $scope.getMaximo();
            if(cMaxMano<=0){
                return [];
            }
            var nroMano = 0;
            var cantMin = cMaxMano - juego.configuracion.cantidadManos + 1;
            for(var i = cantMin; i <= cMaxMano; i++){
                nroMano++;
            var cant = i;
                if(cant == 0){
                    cant = 1
                }else if( cant <0){
                    cant = cant * -1;
                }
                ms.push({numero: nroMano, cantidad: cant });
            }
            juego.configuracion.manos = ms;

        };

        $scope.getMaximo = function(){
            if(juego.jugadores.length <= 0){
                return 0;
            }
            return Math.floor((juego.configuracion.cantidadMazos * 54) / juego.jugadores.length);
        };





        $scope.getManos = function(){
            if(!juego.configuracion.manos || juego.configuracion.manos.length <=0){
                $scope.recalcularDefaultManos();
            }
            return juego.configuracion.manos;
        }


    }])
    .controller('MainCtrl', ['$scope', function ($scope) {

    }])
    .controller('ConfigCtrl', ['$scope', 'juego', function ($scope,juego) {
        $scope.configuracion = juego.configuracion;
    }])
    .controller('NewGameCtrl', ['$scope', '$location', 'juego', function ($scope,$location,juego) {

        $scope.juego = juego;
        $socpe.juego.reiniciarJuego();
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

    }])
    .controller('FlowCtrl',['$scope', 'juego', '$location', function ($scope,juego,$location) {
        $scope.juego = juego;
        $scope.iniciarJuego = function(){
            try{
                $scope.juego.iniciarJuego();
            } catch(e){
                console.log(e);
                return false;
            }
            $location.path("pedirBasas");
        };
        $scope.basasHechasValidas = function(){
            var count = 0;
            for( var idx in $scope.juego.juego.puntajes){
                count += $scope.juego.manoActual.puntajes[idx].basasHechas;
            }
            return count == $scope.getMaximo();
        };
        $scope.basasPedidasValidas = function(){
            var count = 0;
          for( var idx in $scope.juego.manoActual.puntajes){
              count += $scope.juego.manoActual.puntajes[idx].basasPedidas;
          }
            return count != $scope.getMaximo();
        };

        $scope.getJugadores = function(){
            return $scope.juego.jugadores;
        }
        $scope.comenzarRonda = function(){
            $location.path("marcarBasasHechas");
        };
        $scope.finalizarRonda = function(){
            $scope.juego.manoActual.cerrar();
                $location.path("finRonda");

        };
        $scope.haySiguienteRonda = function(){
            return $scope.juego.manos.length > $scope.juego.manoActual.nroMano;
        };

        $scope.finalizarJuego = function(){
            $location.path("");
        };

        $scope.siguienteRonda = function(){
            try {
                $scope.juego.siguienteMano();
            }catch(e){
                console.log(e);
                $location.path("");
            }
            $location.path("pedirBasas");
        };
        $scope.getPuntajes = function(){
           return $scope.juego.manoActual.puntajes;
       };
        $scope.getMaximo = function(){
            return $scope.juego.manoActual.cartas;
        }

    }])



;
