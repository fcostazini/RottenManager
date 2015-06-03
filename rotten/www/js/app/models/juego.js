

function Juego(manos){
    this.jugadores=[];
    this.manos = manos;
    this.manoActual = this.manos[0];
}

Juego.prototype.agregarJugador = function(jugador){
    if (this.jugadores.indexOf(jugador) <0){
        this.jugadores.push(jugador);
    }
};

Juego.prototype.quitarJugador = function(jugador){
    var pos = this.jugadores.indexOf(jugador);
    if ( pos >= 0){
        this.jugadores.splice(pos, 1);
        return true;
    }else{
        return false;
    }
};

Juego.prototype.siguienteMano = function () {
    try {
        this.manoActual.cerrar();
    }catch (e){
        throw new NoCierraManoExeption(this.manoActual,e);
    };
    var posSiguienteMano = -1;
    posSiguienteMano = this.manos.indexOf(this.manoActual)+1;
    if (posSiguienteMano < this.manos.length){
        this.manoActual = this.manos[posSiguienteMano];
        return this.manoActual;
    }else{
        throw new NoHaySiguienteExeption();
    }
};

Juego.prototype.getMano = function (numero) {
    var encontrado = this.manos.filter( function(mano,indx){
                                            return mano.numero == numero
                                        });
    if(encontrado.length <= 0){
        throw new NoExisteElementoExeption(numero);
    }
    return encontrado[0];
};

Juego.prototype.penalizarJugador = function (jugador, pena) {
    this.manoActual.getPuntajeJugador(jugador).agregarPenalizacion(pena);
};

Juego.prototype.bonificarJugador = function (jugador, bono) {
    this.manoActual.getPuntajeJugador(jugador).agregarBonificacion(bono);
};
