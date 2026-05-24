package com.adoo2.uadementor.service;

import com.adoo2.uadementor.model.Factura;
import org.springframework.stereotype.Service;

@Service
public class ReservaImpaga implements IEstado {
    private Stripe stripe;

    @Override
    public void pagar(Factura factura) {
        stripe = new Stripe();
        stripe.pagar(factura.getAnticipo() * factura.getComisionDePlataforma());
        factura.cambiarEstado(new ReservaPaga());
        factura.setEstadoFactura("ReservaPaga");
    }
}


