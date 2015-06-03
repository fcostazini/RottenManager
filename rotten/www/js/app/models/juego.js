

function Juego(){
    this.jugadores=[];
    this.manos = [];
    this.manoActual = {};
    this.repartidor ={};
    this.iniciado = false;
}

Juego.prototype.iniciarJuego = function(){
    if(this.manos.length <=0){
        throw new NoHayManosException();
    }
    if(this.jugadores.length <=1){
        throw  new NoHayJugadoresException();
    }
    this.iniciado = true;
    this.manoActual = this.manos[0];
    this.repartidor = this.jugadores[0];

    return this.manoActual;
}
Juego.prototype.agregarJugador = function(jugador){
    if (this.jugadores.filter(function(e,i){return e.equals(jugador)}).length > 0) {
        throw new YaExisteElementoExeption(jugador);
    }else{
        this.jugadores.push(jugador);
    }
};

Juego.prototype.quitarJugador = function(jugador){
    if(this.iniciado){
        throw new JuegoYaIniciadoException();
    }
    var pos = this.jugadores.indexOf(jugador);
    if ( pos >= 0){
        this.jugadores.splice(pos, 1);
        return true;
    }else{
        return false;
    }
};

Juego.prototype.siguienteMano = function () {
    if(!this.iniciado){
        throw new JuegoNoIniciadoException();
    }
    try {
        this.manoActual.cerrar();
    }catch (e){
        throw new NoCierraManoExeption(this.manoActual,e);
    };
    var posSiguienteMano = -1;
    posSiguienteMano = this.manos.indexOf(this.manoActual)+1;
    if (posSiguienteMano < this.manos.length){
        this.manoActual = this.manos[posSiguienteMano];
        this.repartidor = this.getSiguienteJugador();
        return this.manoActual;
    }else{
        throw new NoHaySiguienteExeption();
    }
};

Juego.prototype.getSiguienteJugador = function(){
    if(!this.iniciado){
        throw new JuegoNoIniciadoException()
    }
    var pos = this.jugadores.indexOf(this.repartidor);
    if(pos == (this.jugadores.length-1)){
        return this.jugadores[0];
    }else{
        return  this.jugadores[pos +1];
    }

}

Juego.prototype.agregarMano = function(mano){
    if(this.iniciado){
        throw new JuegoYaIniciadoException();
    }
    if(this.manos.filter(function(e,i){return e.numero == mano.numero}).length > 0){
        throw new YaExisteElementoExeption(mano);
    }else{
        this.manos.push(mano);
    }

}

Juego.prototype.quitarMano = function(mano){
    if(this.iniciado){
        throw new JuegoYaIniciadoException();
    }
    var manosEncontradas = this.manos.filter(function(e,i){return e.numero == mano.numero});
    if(manosEncontradas.length > 0){
        return this.manos.splice(this.manos.indexOf(manosEncontradas[0]),1);
    }else{
        throw new NoExisteElementoExeption(mano);

    }

}


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
