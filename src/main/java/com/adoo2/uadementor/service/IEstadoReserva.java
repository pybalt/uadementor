package com.adoo2.uadementor.service;

import com.adoo2.uadementor.model.Reserva;

public interface IEstadoReserva {
    void pagar(Reserva reserva, Double monto);

    void cancelar(Reserva reserva);
}


