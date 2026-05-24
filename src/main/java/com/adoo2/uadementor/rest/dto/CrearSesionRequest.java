package com.adoo2.uadementor.rest.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CrearSesionRequest {
    private Date fechaInicio;
    private Date fechaFin;
    private double comisionDePlataforma;
    private double anticipo;
    private double total;
    private Long tutorId;
    private Long alumnoId;
}


