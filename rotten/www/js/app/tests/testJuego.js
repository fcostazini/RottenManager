
if(TEST == undefined){
	var TEST = {};
}

TEST.Juego = {

    setUp: function(){
        this.jugador1 = {};
        this.jugador2 = {};
        this.mano1 = {cerrar : function(){}, Instancia : 1, numero : 1};
        this.mano2 = {cerrar : function(){}, Instancia : 2, numero : 2};
        this.juego = new Juego([this.mano1,this.mano2]);
    },



    testAgregarJugadorSinJugadores : function(){
        this.juego.agregarJugador(this.jugador1);
        return this.juego.jugadores.length == 1;
    },

    testAgregarJugadorConJugadores : function(){
        this.juego.jugadores.push(this.jugador1);
        this.juego.agregarJugador(this.jugador2);
        return this.juego.jugadores.length == 2;
    },

    testAgregarJugadorYaExistente : function() {
        this.juego.jugadores.push(this.jugador1);
        this.juego.agregarJugador(this.jugador1);
        return this.juego.jugadores.length == 1;
    },

    testQuitarJugador : function() {
        this.juego.jugadores.push(this.jugador1);
        var result = this.juego.quitarJugador(this.jugador1);
        return result && this.juego.jugadores.length == 0;
    },

    testQuitarJugadorInexistente : function() {
        this.juego.jugadores.push(this.jugador1);
        var result = this.juego.quitarJugador(this.jugador2);
        return !result && this.juego.jugadores.length == 1;
    },

    testArrancarEnMano1: function(){
        return this.juego.manoActual == this.mano1;
    },

    testPasarDeMano: function(){
        var seLlamoACerrar =false;
        this.juego.manoActual = this.mano1;
        this.juego.manos.push(this.mano1);
        this.mano1.cerrar = function(){ seLlamoACerrar = true;};
        this.juego.manos.push(this.mano2);
        this.juego.siguienteMano();
        return seLlamoACerrar && this.juego.manoActual == this.mano2;

    },

    testSiguienteManoUltimaMano: function(){
        this.juego.manoActual = this.mano2;
        try{
            this.juego.siguienteMano();
            return false;
        }catch (e){
            console.log(e);
            return  e instanceof NoHaySiguienteExeption;
        }
    },

    testSiguienteManoSinPoderCerrarMano: function(){
        this.juego.manoActual = this.mano1;
        this.mano1.cerrar = function(){
            throw new Exeption();
        };
        try{
            this.juego.siguienteMano();
            return false;
        }catch(e){
            console.log(e);
            return  e instanceof NoCierraManoExeption;
        }
    },
    testGetManoExistente: function(){
        var mano = {numero: 99};
        this.juego.manos[0] = mano;
        return this.juego.getMano(99) == mano;
    },

    testGetManoNoExistente: function(){
        try{
            this.juego.getMano(52);
            return false;
        }catch(e){
            console.log(e);
            return  e instanceof NoExisteElementoExeption;
        };
    },

    testPenalizarJugador : function(){
        // El juego debe poder agregar una penalizacion sacada de la configuración
        // a un puntaje de un jugador para la mano actual
        // juego.penalizar(manoActual.puntaje, configuracion.penalizacion);
    },
    testBonificarJugador : function(){
        //IDEM Penalizar pero con bonificacion
    },

	run : function(){
		var resultados = [];
		for(var a in this){
			if(a != "run" && a != "setUp"){
				var resultado ={};
				resultado.name = a;
                this.setUp();
				resultado.value =this[a]();
				resultados[resultados.length] = resultado;
			}
		}

		return resultados;
	}

}
