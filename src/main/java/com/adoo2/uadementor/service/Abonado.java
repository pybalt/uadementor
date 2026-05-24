package com.adoo2.uadementor.service;

import com.adoo2.uadementor.model.Reserva;

public class Abonado implements IEstadoReserva {
    public void pagar(Reserva reserva, Double monto) {
        System.out.println("La reserva ya esta paga");
    }

    public void cancelar(Reserva reserva) {
        Cancelado nuevoEstado = new Cancelado();
        reserva.cambiarEstado(nuevoEstado);
    }
}


