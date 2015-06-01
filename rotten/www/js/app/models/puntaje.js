/**
 * Created by cpastorino on 27/05/2015.
 */


function Puntaje(nroMano, jugador) {
    this.nroMano = nroMano;
    this.jugador = jugador;
    this.puntos = jugador.getUtltimoPuntaje();
    this.jugador.agregarPuntaje(this);
    this.basasPedidas = 0;
    this.basasHechas = 0;
    this.bonificacion = 0;
    this.penalizacion = 0;
};

Puntaje.prototype.agregarBasaPedida = function() {
    this.basasPedidas ++;
    return this.basasPedidas;
};

Puntaje.prototype.quitarBasaPedida = function() {
    if (this.basasPedidas>0) {
       this.basasPedidas --;
    }
    return this.basasPedidas;
};

Puntaje.prototype.agregarBasaHecha = function() {
    this.basasHechas ++;
    return this.basasHechas;
};

Puntaje.prototype.quitarBasaHecha = function() {
    if (this.basasHechas>0) {
        this.basasHechas --;
    }
    return this.basasHechas;
};

Puntaje.prototype.agregarBonificacion = function(bonos) {
    this.bonificacion = this.bonificacion + bonos;
    return this.bonificacion;
};

Puntaje.prototype.quitarBonificacion = function(bonos) {
    if (this.bonificacion>=bonos) {
        this.bonificacion = this.bonificacion - bonos;
    }
    return this.bonificacion;
};

Puntaje.prototype.agregarPenalizacion = function(pena) {
    this.penalizacion = this.penalizacion + pena;
    return this.penalizacion;
};

Puntaje.prototype.quitarPenalizacion = function(pena) {
    if (this.penalizacion>=pena) {
        this.penalizacion = this.penalizacion - pena;
    }
    return this.penalizacion;
};

Puntaje.prototype.calcularPuntos = function() {
    this.puntos  += this.bonificacion - this.penalizacion;
    if(this.basasPedidas == this.basasHechas){
        this.puntos += 10 + (this.basasHechas * 5);
    }else if(this.basasPedidas > this.basasHechas){
        this.puntos += (this.basasPedidas * -5);
    }else if(this.basasPedidas < this.basasHechas){
        this.puntos += (this.basasHechas * -5);
    }
    return this.puntos;
};
