/**
 * Created by cpastorino on 31/05/2015.
 */


if(TEST == undefined){
    var TEST = {};
}


TEST.Jugador = {

    setUp: function () {
        this.jugador = new Jugador("Facundo");
    },

    testJugadorTieneNombre: function () {
        return (this.jugador.nombre == "Facundo");
    },

    testJugadorNoTieneNombre: function () {
        var noHayNombre = false;
        var nombreVacio = false;
        nombre = "";
        try{
            this.jugador = new Jugador();
        } catch (e) {
            if (e instanceof ParametroVacioExeption) {
                noHayNombre = true;
            }
        }
        try{
            this.jugador = new Jugador(nombre);
        } catch (e){
            if (e instanceof ParametroVacioExeption) {
                nombreVacio = true;
            }
        }
        return (noHayNombre && nombreVacio);
    },

    testAddPuntajeNoExistente : function () {
        this.jugador.agregarPuntaje({nroMano : 1});
        return this.jugador.puntajes[0].nroMano == 1;
    },

    testAddPuntajeExistente : function () {
        this.jugador.puntajes[0]={nroMano : 1};
        try{
            this.jugador.agregarPuntaje({nroMano : 1});
        } catch (e) {
            if(e instanceof YaExisteElementoExeption && e.detalle==1) {
                return true;
            }
        }
        return false;
    },

    testQuitarPuntajeExistente : function () {
        this.jugador.puntajes[0]={nroMano : 1};
        this.jugador.puntajes[1]={nroMano : 2};
        this.jugador.quitarPuntaje({nroMano : 2});
        return (this.jugador.puntajes.length == 1);
    },

    testQuitarPuntajeNoExistente : function () {
        this.jugador.puntajes[0]={nroMano : 1};
        this.jugador.puntajes[1]={nroMano : 2};
        try{
            this.jugador.quitarPuntaje({nroMano : 3});
        }catch(e) {
            return (e instanceof NoExisteElementoExeption && e.detalle == 3);
            }
        return false;
    },

    testGetUltimoPuntaje : function () {
        this.jugador.puntajes[0]={puntos : 25};
        this.jugador.puntajes[1]={puntos : 15};
        this.jugador.puntajes[2]={puntos : 10};
        this.jugador.puntajes[3]={puntos : 5};
        return (this.jugador.getUltimoPuntaje() == 5);
    },

    testGetUltimoPuntajePrimerPuntaje : function () {
        return (this.jugador.getUltimoPuntaje() == 0);
    },



    run: function() {
        var resultados = [];
        for (var a in this) {
            if (a != "run" && a != "setUp") {
                var resultado = {};
                resultado.name = a;
                this.setUp();
                try{
                resultado.value = this[a]();
                }catch(e){
                    resultado.value = false;
                    console.log(e);
                }
                resultados[resultados.length] = resultado;
            }
        }

        return resultados;
    }
}


