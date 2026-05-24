package com.adoo2.uadementor.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Materia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String descripcion;
    private String zona;

    @ElementCollection
    private List<String> idiomas;

    private int tamMaxGrupo;

    @Transient
    private Servicio tipo;

    public void agregarMateria(Tutor tutor, Materia materia) {
        tutor.getMaterias().add(materia);
    }

    public void eliminarMateria(Tutor tutor, Materia materia) {
        tutor.getMaterias().remove(materia);
    }

    public double precio() {
        return tipo.getPrecio();
    }
}


