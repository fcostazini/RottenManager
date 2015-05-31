/**
 * Created by cpastorino on 27/05/2015.
 */


function Puntaje(nroMano, jugador) {
    this.nroMano = nroMano;
    this.jugador = jugador;
    this.puntos = jugador.getUtltimoPuntaje();
    this.jugador.addPuntaje(this);
    this.basasPedidas = 0;
    this.basasHechas = 0;
};

Puntaje.prototype.cerrar = function() {
    return true;
};
