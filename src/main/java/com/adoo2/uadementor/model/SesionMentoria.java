package com.adoo2.uadementor.model;

import com.adoo2.uadementor.service.IEstadoSesion;
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
public class SesionMentoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Temporal(TemporalType.DATE)
    private Date fechaInicio;

    @Temporal(TemporalType.DATE)
    private Date fechaFin;

    private double comisionDePlataforma;
    private double anticipo;
    private double total;

    @ManyToOne
    @JoinColumn(name = "tutor_id", nullable = false)
    private Tutor tutor;

    @ManyToOne
    @JoinColumn(name = "alumno_id", nullable = false)
    private Alumno alumno;

    @ManyToOne
    @JoinColumn(name = "materia_id", nullable = true)
    private Materia materia;

    @ManyToOne
    @JoinColumn(name = "factura_id", nullable = true)
    private Factura factura;

    @ManyToOne
    @JoinColumn(name = "reserva_id", nullable = true)
    private Reserva reserva;

    private String estado;

    @Transient
    @JsonIgnore
    private IEstadoSesion estadoSesion;

    public double precioTotal() {
        return total + materia.precio();
    }

    public SesionMentoria aceptar(Tutor tutor, Alumno alumno) {
        estadoSesion.aceptar(tutor, alumno, this);
        return this;
    }

    public SesionMentoria cancelar(Tutor tutor, Alumno alumno) {
        estadoSesion.cancelar(tutor, alumno, this);
        return this;
    }

    public SesionMentoria concretar(Tutor tutor, Alumno alumno) {
        estadoSesion.concretar(tutor, alumno, this);
        return this;
    }

    public SesionMentoria reservar(Tutor tutor, Alumno alumno) {
        estadoSesion.reservar(tutor, alumno, this);
        return this;
    }

    public void pagar() {
        factura.pagar();
    }
}


