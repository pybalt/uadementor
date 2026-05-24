package com.adoo2.uadementor.service;

import com.adoo2.uadementor.model.Reserva;

public class Pendiente implements IEstadoReserva {
    public void pagar(Reserva reserva, Double monto) {
        reserva.getSesionMentoria().pagar();
        Abonado nuevoEstado = new Abonado();
        reserva.cambiarEstado(nuevoEstado);
    }

    public void cancelar(Reserva reserva) {
        Cancelado nuevoEstado = new Cancelado();
        reserva.cambiarEstado(nuevoEstado);
    }
}


