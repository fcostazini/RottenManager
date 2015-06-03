/**
 * Created by cpastorino on 27/05/2015.
 */


function Mano(nroMano, cartas) {
    this.nroMano = nroMano;
    this.cartas = cartas;
    this.puntajes = [];
};

Mano.prototype.cerrar = function() {
    return true;
}

Mano.prototype.getPuntajeJugador = function(jugador) {
    var puntaje;

    return puntaje;
}
