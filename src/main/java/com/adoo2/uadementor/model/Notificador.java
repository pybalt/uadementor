package com.adoo2.uadementor.model;

import com.adoo2.uadementor.service.INotificacion;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

import org.springframework.beans.factory.annotation.Autowired;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Notificador implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "tutor_id", nullable = false)
    private Tutor tutor;

    @ManyToOne
    @JoinColumn(name = "alumno_id", nullable = false)
    private Alumno alumno;

    private String mensaje;

    @Transient
    @Autowired
    private INotificacion tipo;

    public void enviarNotificacion(Usuario usuario) {
        tipo.enviarNotificacion(usuario);
    }

    public void enviarNotificacion(Alumno alumno) {
        tipo.enviarNotificacion(alumno);
    }

    public void enviarCalificacion(Alumno alumno, Tutor tutor) {
        tipo.enviarCalificacion(alumno, tutor);
    }

    public void cambiarTipoNotificacion(INotificacion nuevoTipo) {
        this.tipo = nuevoTipo;
    }
}


