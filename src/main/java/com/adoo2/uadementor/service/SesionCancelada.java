package com.adoo2.uadementor.service;

import com.adoo2.uadementor.model.Tutor;
import com.adoo2.uadementor.model.Alumno;
import com.adoo2.uadementor.model.SesionMentoria;

public class SesionCancelada implements IEstadoSesion {
    @Override
    public void aceptar(Tutor tutor, Alumno alumno, SesionMentoria sesionMentoria) {
        System.out.println("No se puede aceptar la sesiÃƒÂ³n, estÃƒÂ¡ cancelada");
    }

    @Override
    public void cancelar(Tutor tutor, Alumno alumno, SesionMentoria sesionMentoria) {
        System.out.println("La sesiÃƒÂ³n ya estÃƒÂ¡ cancelada");
    }

    @Override
    public void concretar(Tutor tutor, Alumno alumno, SesionMentoria sesionMentoria) {
        System.out.println("No se puede concretar la sesiÃƒÂ³n, estÃƒÂ¡ cancelada");
    }

    @Override
    public void reservar(Tutor tutor, Alumno alumno, SesionMentoria sesionMentoria) {
        System.out.println("No se puede reservar la sesiÃƒÂ³n, estÃƒÂ¡ cancelada");
    }
}


