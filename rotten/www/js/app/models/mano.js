/**
 * Created by cpastorino on 27/05/2015.
 */


function Mano(nroMano, cartas) {
    this.nroMano = nroMano;
    this.cartas = cartas;
    this.puntajes = [];
    this.esCerrada = false;
};

Mano.prototype.cerrar = function() {

    for(var i in this.puntajes){
        this.puntajes[i].calcularPuntos();
    }
    this.esCerrada = true;
    return true;
}

Mano.prototype.getPuntajeJugador = function(jugador) {
    var puntaje;

    return puntaje;
}
Mano.prototype.agregarPuntaje = function(puntaje){
    this.puntajes.push(puntaje);
}
