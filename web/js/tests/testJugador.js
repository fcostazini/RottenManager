/**
 * Created by cpastorino on 31/05/2015.
 */


if(TEST == undefined){
    var TEST = {};
}


TEST.Jugador = {
    setUp: function(){

    },

    testJugadorTieneNombre : function(){
    //tenes que testear que al crear un jugador, SIEMPRE tenga nombre. No construir cun jugador sin nombre o con scring vacio.
    },

    testAddPuntajeNoExistente : function () {
        //add puntaje recibe un puntaje y lo agregar a la lista de puntajes. Fijarme que no este agregado, ver el nro de mano
    },

    testAddPuntajeExistente : function () {
        //Con una excepcion de elemento duplicado.
    },

    testQuitarPuntajeExistente : function () {
        //Lo mismo!
    },

    testQuitarPuntajeNoExistente : function () {

    },

    testGetUltimoPuntaje : function () {
        //me tiene q devolver el ultimo puntaje
    },

    testGetUltimoPuntajePrimerPuntaje : function () {
        //si no hay puntajes me tiene q devolver 0
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


