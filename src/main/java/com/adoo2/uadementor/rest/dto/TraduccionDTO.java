package com.adoo2.uadementor.rest.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TraduccionDTO {
    private String descripcion;
    private double precio;
    private int duracion;
    private String zona;
    private List<String> idiomas;
}


