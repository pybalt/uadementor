package com.adoo2.uadementor.model;

import com.adoo2.uadementor.service.IAdapterChat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "alumno_id", nullable = false)
    private Alumno alumno;

    @ManyToOne
    @JoinColumn(name = "tutor_id", nullable = false)
    private Tutor tutor;

    @Temporal(TemporalType.TIMESTAMP)
    private Date fecha;

    private String canal;

    @Transient
    @Autowired
    private IAdapterChat adapter;

    public void enviarMensaje(Mensaje mensaje) {
        adapter.enviarMensaje(mensaje);
    }
}


