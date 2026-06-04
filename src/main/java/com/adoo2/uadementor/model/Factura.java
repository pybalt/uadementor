package com.adoo2.uadementor.model;

import com.adoo2.uadementor.service.IEstado;
import com.adoo2.uadementor.service.Notificaciones_email;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Factura {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double comisionDePlataforma;
    private double montoTotal;
    private double anticipo;

    @Temporal(TemporalType.DATE)
    private Date fechaFactura;

    @Transient
    @JsonIgnore
    private IEstado estado;

    private String estadoFactura;

    private Notificador notificador;

    public void enviarFactura(Alumno alumno) {}

    public double precioTotal() {
        return montoTotal + comisionDePlataforma;
    }

    public void cambiarEstado(IEstado nuevoEstado) {
        this.estado = nuevoEstado;
    }

    public void pagar() {
        estado.pagar(this);
    }
}


