/**
 * Created by cpastorino on 31/05/2015.
 */


if(TEST == undefined){
    var TEST = {};
}


TEST.Mano = {
    setUp: function(){

    },

    testAgregarPuntajeExistente : function(){
      //No debe permitir agregar mas de un puntaje por jugador
    },
    testAgregarPuntaje : function(){
      //Verificar que se agregue un puntaje particular
    },
    testObtenerPuntajePorJugador : function(){
        //Dado un jugador pasado por parametro, debe devolver el puntaje del mismo
        // mano.getPuntajeByJugador(jugadorParam) --- puntaje.jugador == jugadorParam
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


