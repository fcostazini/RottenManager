
if (TEST == undefined) {
    var TEST = {};
}

TEST.Juego = {

    setUp : function(){
        this.jugador1 = {};
        this.jugador2 = {};
        this.mano1 = {cerrar: function () {return true;}, Instancia: 1, numero: 1 };
        this.mano2 = {cerrar: function () {return true;}, Instancia: 2, numero: 2 };
        this.juego = new Juego();

    },

    testIniciarJuego : function(){
        this.juego.manos.push(this.mano1);
        this.juego.manos.push(this.mano2);
        this.juego.jugadores.push(this.jugador1);
        this.juego.jugadores.push(this.jugador2);
        this.juego.iniciarJuego();
        return this.juego.manoActual == this.mano1 &&
                this.juego.repartidor == this.jugador1;
    },
    testIniciarJuegoSinManos : function(){

        try{
            this.juego.iniciarJuego();
            return false;
        } catch(e){
            return e instanceof NoHayManosException;
        }

    },
    testIniciarJuegoSinJugadores : function(){
        this.juego.manos.push(this.mano1);
        this.juego.manos.push(this.mano2);
       try{
           this.juego.iniciarJuego();
           return false;
       } catch(e){
           return e instanceof NoHayJugadoresException;
       }

    },


    testAgregarJugadorSinJugadores: function () {
        this.juego.agregarJugador(this.jugador1);
        return this.juego.jugadores.length == 1;
    },

    testAgregarJugadorConJugadores: function () {
        this.jugador1.equals = function(e){return false;}
        this.jugador2.equals = function(e){return false;}
        this.juego.jugadores.push(this.jugador1);
        this.juego.agregarJugador(this.jugador2);
        return this.juego.jugadores.length == 2;
    },

    testAgregarJugadorYaExistente: function () {
        this.juego.jugadores.push(this.jugador1);

        try{
            this.juego.agregarJugador(this.jugador1);
            return false;
        }catch(e){
            return true;
        }

    },

    testQuitarJugador: function () {
        this.juego.jugadores.push(this.jugador1);
        var result = this.juego.quitarJugador(this.jugador1);
        return result && this.juego.jugadores.length == 0;
    },

    testQuitarJugadorInexistente: function () {
        this.juego.jugadores.push(this.jugador1);
        var result = this.juego.quitarJugador(this.jugador2);
        return !result && this.juego.jugadores.length == 1;
    },

    testArrancarEnMano1: function () {
        this.juego.manos.push(this.mano1);
        this.juego.manos.push(this.mano2);
        this.juego.jugadores.push(this.jugador1);
        this.juego.jugadores.push(this.jugador2);
        this.juego.iniciarJuego();
        return this.juego.manoActual == this.mano1;
    },

    testPasarDeMano: function () {
        var seLlamoACerrar = false;

        this.mano1.cerrar = function () {
            seLlamoACerrar = true;
        };
        this.juego.manos.push(this.mano1);
        this.juego.manos.push(this.mano2);
        this.juego.jugadores.push(this.jugador1);
        this.juego.jugadores.push(this.jugador2);

        this.juego.iniciarJuego();
        this.juego.siguienteMano();
        return seLlamoACerrar && this.juego.manoActual == this.mano2;

    },

    testSiguienteManoUltimaMano: function () {

        this.juego.manos.push(this.mano1);
        this.juego.manos.push(this.mano2);
        this.juego.jugadores.push(this.jugador1);
        this.juego.jugadores.push(this.jugador2);
        try {
            this.juego.iniciarJuego();
            this.juego.manoActual = this.mano2;
            this.juego.siguienteMano();
            return false;
        } catch (e) {
            console.log(e);
            return e instanceof NoHaySiguienteExeption;
        }
    },

    testSiguienteManoSinPoderCerrarMano: function () {
        this.juego.manoActual = this.mano1;
        this.mano1.cerrar = function () {
            throw new Exeption();
        };
        this.juego.manos.push(this.mano1);
        this.juego.manos.push(this.mano2);
        this.juego.jugadores.push(this.jugador1);
        this.juego.jugadores.push(this.jugador2);

        try {
            this.juego.iniciarJuego();
            this.juego.siguienteMano();
            return false;
        } catch (e) {
            console.log(e);
            return e instanceof NoCierraManoExeption;
        }
    },
    testGetManoExistente: function () {
        var mano = {numero: 99};
        this.juego.manos[0] = mano;
        return this.juego.getMano(99) == mano;
    },

    testGetManoNoExistente: function () {
        try {
            this.juego.getMano(52);
            return false;
        } catch (e) {
            return e instanceof NoExisteElementoExeption;
        }
        ;
    },

    testAgregarManoSinManos: function () {
        this.juego.agregarMano(this.mano1);
        return this.juego.manos.length == 1;
    },

    testAgregarManoConManos: function () {
        this.juego.manos.push(this.mano1);
        this.juego.agregarMano(this.mano2);
        return this.juego.manos.length == 2;
    },

    testAgregarManoYaExistente: function () {
        this.juego.manos.push(this.mano1);
        try{
            this.juego.agregarMano(this.mano1);
            return false;
        }catch(e){
            return this.juego.manos.length == 1;
        }


    },

    testQuitarMano: function () {
        this.juego.manos.push(this.mano1);
        var result = this.juego.quitarMano(this.mano1);
        return result && this.juego.manos.length == 0;
    },

    testQuitarManoInexistente: function () {
        this.juego.manos.push(this.mano1);

        try{
            var result = this.juego.quitarMano(this.mano2);
            return false;
        }catch(e){
            return e instanceof NoExisteElementoExeption;
        }

    },

    testPenalizarJugador: function () {
        // El juego debe poder agregar una penalizacion sacada de la configuración
        // a un puntaje de un jugador para la mano actual
        // juego.penalizar(manoActual.puntaje, configuracion.penalizacion);
    },
    testBonificarJugador: function () {
        //IDEM Penalizar pero con bonificacion
    },

    run: function () {
        var resultados = [];
        for (var a in this) {
            if (a != "run" && a != "setUp") {
                var resultado = {};
                resultado.name = a;
                try {
                    this.setUp();
                    resultado.value = this[a]();
                } catch (e) {
                    resultado.value = false;
                    console.log(a);console.log(e);
                }
                resultados[resultados.length] = resultado;
            }
        }

        return resultados;
    }

}
