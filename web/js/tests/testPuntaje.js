/**
 * Created by cpastorino on 31/05/2015.
 */


if(TEST == undefined){
    var TEST = {};
}


TEST.Puntaje = {
    setUp: function(){

    },

// Agregar puntaje (valor por bonificacion
// Restar puntaje (valor por penalizacion);




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


