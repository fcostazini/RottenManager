/**
 * Created by cpastorino on 27/05/2015.
 */


function Jugador(nombre) {
    this.nombre = "";
    this.total =0;
    if (nombre) {
        this.nombre = nombre;
    } else {
        throw new ParametroVacioExeption("Falta nombre del Jugador");
    }
    this.puntajes = [];
};

Jugador.prototype.reiniciarPuntaje = function(){
    this.total = 0;
this.puntajes = [];
}
Jugador.prototype.agregarPuntaje = function (puntaje) {
    if (this.puntajes.filter(function (elem, idx) {
            return elem.nroMano == puntaje.nroMano
        }).length == 0) {
        this.puntajes.push(puntaje);
    } else {
        throw new YaExisteElementoExeption(puntaje.nroMano);
    }
};
Jugador.prototype.actualizarTotal = function(valor){
    this.total += valor;
}
Jugador.prototype.equals = function (jugador) {
    return this.nombre == jugador.nombre;
};
Jugador.prototype.quitarPuntaje = function (puntaje) {
    var pos = -1;
    for (i in this.puntajes) {
        if (this.puntajes[i].nroMano == puntaje.nroMano) {
            pos = i;
        }
    }
    if (pos >= 0) {
        this.puntajes.splice(pos, 1);
        return true;
    } else {
        throw new NoExisteElementoExeption(puntaje.nroMano);
    }
};
Jugador.prototype.getUltimoPuntaje = function () {
    if (this.puntajes.length > 0) {
        return this.puntajes[(this.puntajes.length - 1)];
    } else {
        return null;
    }
};
