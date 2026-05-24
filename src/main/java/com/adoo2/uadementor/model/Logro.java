package com.adoo2.uadementor.model;

import java.util.Date;

import com.adoo2.uadementor.service.CalificacionService;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.DiscriminatorType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "tipo_logro", discriminatorType = DiscriminatorType.STRING)
public abstract class Logro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    @JsonIgnore
    private Usuario usuario;

    @Temporal(TemporalType.DATE)
    private Date fechaObtencion;

    public abstract boolean verificarCriterios(Tutor tutor, Alumno alumno, CalificacionService calificacionService);

    public abstract Logro otorgarLogro(Usuario usuario);

    public void setUsuario(Usuario usuario){
        this.usuario = usuario;
    }
    public void setfecha(Date fecha){
        this.fechaObtencion = fecha;
    }
}


