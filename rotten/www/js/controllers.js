
angular.module('rottenManager.controllers', [])
    .controller('ManosCtrl', ['$scope', '$ionicPlatform', 'juego',function ($scope,$ionicPlatform,juego) {
        $scope.juego = juego;
        $ionicPlatform.registerBackButtonAction(function () {
           return false;
        }, 100);
        $scope.modificarMano = function(valor,mano){
          mano.cantidad += valor;
            if(mano.cantidad > $scope.getMaximo()){
                mano.cantidad = $scope.getMaximo();
            }
            if(mano.cantidad < 1){
                mano.cantidad = 1;
            }

        };

        $scope.recalcularDefaultManos = function(){
            var ms = [];
            var cMaxMano = $scope.getMaximo();
            if(cMaxMano<=0){
                return [];
            }
            var nroMano = 0;
            var cantMin = cMaxMano - $scope.juego.configuracion.cantidadManos + 1;
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
            $scope.juego.configuracion.manos = ms;

        };

        $scope.getMaximo = function(){
            if($scope.juego.jugadores.length <= 0){
                return 0;
            }
            return Math.floor(($scope.juego.configuracion.cantidadMazos * 54) / $scope.juego.jugadores.length);
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
        $scope.modificarPenalidad = function(valor){
            $scope.configuracion.valorPenalidad += valor;
            if($scope.configuracion.valorPenalidad < 0){
                $scope.configuracion.valorPenalidad = 0;
            }

        };
        $scope.modificarBonificacion = function(valor){
            $scope.configuracion.valorBonificacion += valor;
            if($scope.configuracion.valorBonificacion < 0){
                $scope.configuracion.valorBonificacion = 0;
            }

        };
        $scope.modificarCantidadManos = function(valor){
            $scope.configuracion.cantidadManos += valor;
            if($scope.configuracion.cantidadManos < 1){
                $scope.configuracion.cantidadManos = 1;
            }

        };
        $scope.modificarCantidadMazos = function(valor){
            $scope.configuracion.cantidadMazos += valor;
            if($scope.configuracion.cantidadMazos < 1){
                $scope.configuracion.cantidadMazos = 1;
            }
            if($scope.configuracion.cantidadMazos > 2){
                $scope.configuracion.cantidadMazos = 2;
            }

        };

    }])
    .controller('NewGameCtrl', ['$scope', '$location', 'juego', function ($scope,$location,juego) {

        $scope.juego = juego;
        $scope.newGame = function(){
            $scope.juego.reiniciarJuego();
            $location.path("jugadores")
        }

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
    .controller('FlowCtrl',['$scope', 'juego', '$ionicScrollDelegate', '$location', function ($scope,juego,$ionicScrollDelegate, $location) {
        $scope.juego = juego;

        $scope.esJugadorQueReparte = function(jugador){
            if($scope.juego.repartidor.nombre == jugador.nombre){
                return true;
            }
        }
		$scope.modificarBasasAPedir = function(valor,puntaje){
            puntaje.basasPedidas += valor;
            if(puntaje.basasPedidas > $scope.getMaximo()){
                puntaje.basasPedidas = $scope.getMaximo();
            }
            if(puntaje.basasPedidas < 0){
                puntaje.basasPedidas = 0;
            }
        };
		
		$scope.modificarBasasHechas = function(valor,puntaje){
            puntaje.basasHechas += valor;
            if(puntaje.basasHechas > $scope.getMaximo()){
                puntaje.basasHechas = $scope.getMaximo();
            }
            if(puntaje.basasHechas < 0){
                puntaje.basasHechas = 0;
            }
        };
        $scope.iniciarJuego = function(){
            try{
                $ionicScrollDelegate.scrollTop();
                $scope.juego.iniciarJuego();
            } catch(e){
                console.log(e);
                return false;
            }
            $location.path("pedirBasas");
        };
        $scope.basasHechasValidas = function(){
            var count = 0;
            for( var idx in $scope.juego.manoActual.puntajes){
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
            $ionicScrollDelegate.scrollTop();
            $location.path("marcarBasasHechas");
        };
        $scope.finalizarRonda = function(){
            $ionicScrollDelegate.scrollTop();
            $scope.juego.manoActual.cerrar();
                $location.path("finRonda");

        };
        $scope.haySiguienteRonda = function(){
            return $scope.juego.manos.length > $scope.juego.manoActual.nroMano;
        };

        $scope.finalizarJuego = function(){
            $ionicScrollDelegate.scrollTop();
            $location.path("");
        };

        $scope.siguienteRonda = function(){
            try {
                $ionicScrollDelegate.scrollTop();
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

        $scope.getPuntajeJugador = function(jugador){
            return $scope.juego.manoActual.getPuntajeJugador(jugador);
        }

    }])



;
