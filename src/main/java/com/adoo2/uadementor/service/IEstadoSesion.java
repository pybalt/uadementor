package com.adoo2.uadementor.service;

import com.adoo2.uadementor.model.Tutor;
import com.adoo2.uadementor.model.Alumno;
import com.adoo2.uadementor.model.SesionMentoria;

public interface IEstadoSesion {
    void aceptar(Tutor tutor, Alumno alumno, SesionMentoria sesionMentoria);
    void cancelar(Tutor tutor, Alumno alumno, SesionMentoria sesionMentoria);
    void concretar(Tutor tutor, Alumno alumno, SesionMentoria sesionMentoria);
    void reservar(Tutor tutor, Alumno alumno, SesionMentoria sesionMentoria);
}


