package com.adoo2.uadementor.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;

import com.adoo2.uadementor.service.IEstadoReserva;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime fechaHora;

    @Autowired
    @Transient
    @JsonIgnore
    private IEstadoReserva estado;

    @ManyToOne
    private Alumno alumno;

    @ManyToOne
    private Tutor tutor;

    @OneToOne
    private SesionMentoria sesionMentoria;

    public void pagar() {
        estado.pagar(this, null);
    }

    public void cancelar() {
        estado.cancelar(this);
    }

    public void cambiarEstado(IEstadoReserva nuevoEstado) {
        this.setEstado(nuevoEstado);
    }
}


