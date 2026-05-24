package com.adoo2.uadementor.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Tutor extends Usuario {
    @ElementCollection
    private List<String> ciudadesServicio;

    @OneToMany
    private List<Materia> materias;

    @OneToOne
    @JoinColumn(name = "credencial_id", nullable = true)
    private Credencial credencial;

    @OneToMany(mappedBy = "tutor")
    @JsonManagedReference
    private List<Calificacion> calificaciones;

    public Tutor(String nombre, String apellido, int dni, String email, String pass, int telefono) {
        super(nombre, apellido, dni, email, pass, telefono);
    }

    public List<Calificacion>getListaCalificaciones(){
        return calificaciones;
    }
}


