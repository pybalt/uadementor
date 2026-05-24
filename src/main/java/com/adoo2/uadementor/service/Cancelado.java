package com.adoo2.uadementor.service;

import com.adoo2.uadementor.model.Reserva;

public class Cancelado implements IEstadoReserva {
    public void pagar(Reserva reserva, Double monto) {
        System.out.println("No se puede pagar la reserva dado que esta cancelada");
    }

    public void cancelar(Reserva reserva) {
        System.out.println("La reserva ya esta cancelada");
    }
}


