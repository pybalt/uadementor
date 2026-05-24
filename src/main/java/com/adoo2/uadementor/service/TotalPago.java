package com.adoo2.uadementor.service;

import com.adoo2.uadementor.model.Factura;
import org.springframework.stereotype.Service;

@Service
public class TotalPago implements IEstado {
    @Override
    public void pagar(Factura factura) {
        System.out.println("La factura ya esta pagada: " + factura.getId());
    }
}


