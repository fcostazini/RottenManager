/**
 * Created by cpastorino on 31/05/2015.
 */


if(TEST == undefined){
    var TEST = {};
}


TEST.Puntaje = {
    setUp: function(){
        var jugador = {nombre : "Pepe", getUtltimoPuntaje : function(){return 0;}, agregarPuntaje : function(puntaje){}};
        this.puntaje = new Puntaje(2, jugador)
    },

    testAgregarBasaPedida : function() {
        this.puntaje.basasPedidas = 1;
        this.puntaje.agregarBasaPedida();
        return this.puntaje.basasPedidas == 2;
    },

    testQuitarBasaPedida : function() {
        this.puntaje.basasPedidas = 2;
        this.puntaje.quitarBasaPedida();
        return this.puntaje.basasPedidas == 1;
    },

    testQuitarBasaPedidaSinBasas : function() {
        this.puntaje.quitarBasaPedida();
        return this.puntaje.basasPedidas == 0;
    },

    testAgregarBasaHecha : function() {
        this.puntaje.basasHechas = 1;
        this.puntaje.agregarBasaHecha();
        return this.puntaje.basasHechas == 2;
    },

    testQuitarBasaHecha : function() {
        this.puntaje.basasHechas = 2;
        this.puntaje.quitarBasaHecha();
        return this.puntaje.basasHechas == 1;
    },

    testQuitarBasaHechaSinBasas : function() {
        this.puntaje.quitarBasaHecha();
        return this.puntaje.basasHechas == 0;
    },

    testAgregarBonificacion : function(bonos) {
        this.puntaje.bonificacion = 20;
        this.puntaje.agregarBonificacion(20);
        return this.puntaje.bonificacion == 40;
    },


    testQuitarBonificacion : function(bonos) {
        this.puntaje.bonificacion = 60;
        this.puntaje.quitarBonificacion(20);
        return this.puntaje.bonificacion == 40;
    },

    testQuitarBonificacionSinBonos : function() {
        this.puntaje.quitarBonificacion(20);
        return this.puntaje.bonificacion == 0;
    },

    testAgregarPenalizacion : function(pena) {
        this.puntaje.penalizacion = 20;
        this.puntaje.agregarPenalizacion(20);
        return this.puntaje.penalizacion == 40;
    },

    testQuitarPenalizacion : function(pena) {
        this.puntaje.penalizacion = 60;
        this.puntaje.quitarPenalizacion(20);
        return this.puntaje.penalizacion == 40;
    },

    testQuitarPenalizacionSinPenas : function() {
        this.puntaje.quitarPenalizacion(20);
        return this.puntaje.penalizacion == 0;
    },

    testCalcularPuntosSiSonIguales : function() {
        this.puntaje.puntos = 40;
        this.puntaje.basasPedidas = 2;
        this.puntaje.basasHechas = 2;
        this.puntaje.bonificacion = 20;
        this.puntaje.penalizacion = 10;
        this.puntaje.calcularPuntos();
        return this.puntaje.puntos == 70;
    },

    testCalcularPuntosSiMayorPedidas : function() {
        this.puntaje.puntos = 40;
        this.puntaje.basasPedidas = 3;
        this.puntaje.basasHechas = 2;
        this.puntaje.bonificacion = 20;
        this.puntaje.penalizacion = 10;
        this.puntaje.calcularPuntos();
        return this.puntaje.puntos == 35;
    },

    testCalcularPuntosSiMayorHechas : function() {
        this.puntaje.puntos = 40;
        this.puntaje.basasPedidas = 2;
        this.puntaje.basasHechas = 3;
        this.puntaje.bonificacion = 20;
        this.puntaje.penalizacion = 10;
        this.puntaje.calcularPuntos();
        return this.puntaje.puntos == 35;
    },


    run: function() {
        var resultados = [];
        for (var a in this) {
            if (a != "run" && a != "setUp") {
                var resultado = {};
                resultado.name = a;
                this.setUp();
                resultado.value = this[a]();
                resultados[resultados.length] = resultado;
            }
        }

        return resultados;
    }
}


