package com.adoo2.uadementor.rest.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CalificacionRequest {
    public Long tutorId;
    public Long alumnoId;
    public int puntaje;
    public String comentario;
}


