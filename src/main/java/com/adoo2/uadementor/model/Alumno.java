package com.adoo2.uadementor.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class Alumno extends Usuario {
    @ElementCollection
    private List<String> destinosFav;

    private int puntuacion;
    @OneToMany(mappedBy = "alumno", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Calificacion> calificaciones;

    public Alumno(String nombre, String apellido, int dni, String email, String pass, int telefono) {
        super(nombre, apellido, dni, email, pass, telefono);
    }

    @Override
    public void agregarUsuario(Usuario usuario) {}

    @Override
    public void eliminarUsuario(Usuario usuario) {}
}


