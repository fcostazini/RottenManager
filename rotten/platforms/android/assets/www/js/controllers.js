angular.module('rottenManager.controllers', [])
    .controller('ManosCtrl', ['$scope', 'juego',function ($scope,juego) {

        $scope.recalcularDefaultManos = function(){
            var ms = [];
            var cMaxMano = this.getMaximo();
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
                this.recalcularDefaultManos();
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
        juego.reiniciarJuego();
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
        $scope.iniciarJuego = function(){
            try{
                juego.iniciarJuego();
            } catch(e){
                console.log(e);
                return false;
            }
            $location.path("pedirBasas");
        };
        $scope.basasHechasValidas = function(){
            var count = 0;
            for( var idx in this.manoActual.puntajes){
                count += this.manoActual.puntajes[idx].basasHechas;
            }
            return count == this.getMaximo();
        };
        $scope.basasPedidasValidas = function(){
            var count = 0;
          for( var idx in this.manoActual.puntajes){
              count += this.manoActual.puntajes[idx].basasPedidas;
          }
            return count != this.getMaximo();
        };

        $scope.getJugadores = function(){
            return juego.jugadores;
        }
        $scope.comenzarRonda = function(){
            $location.path("marcarBasasHechas");
        };
        $scope.finalizarRonda = function(){
            this.manoActual.cerrar();
                $location.path("finRonda");

        };
        $scope.haySiguienteRonda = function(){
            return juego.manos.length > this.manoActual.nroMano;
        };

        $scope.finalizarJuego = function(){
            $location.path("");
        };

        $scope.siguienteRonda = function(){
            try {
                this.manoActual = juego.siguienteMano();
            }catch(e){
                console.log(e);
                $location.path("");
            }
            $location.path("pedirBasas");
        };
        $scope.manoActual = juego.manoActual;
       $scope.getPuntajes = function(){
           return this.manoActual.puntajes;
       };
        $scope.getMaximo = function(){
            return this.manoActual.cartas;
        }

    }])



;
