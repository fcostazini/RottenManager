/**
 * Created by cpastorino on 30/05/2015.
 */

function Exeption (){};

function NoExisteElementoExeption (detalle) {
    this.detalle = detalle;
};

function NoHaySiguienteExeption (detalle) {
    this.detalle = detalle;
};

function NoCierraManoExeption (mano,e){
    this.mano = mano;
    this.excepcionRaiz = e;
};

