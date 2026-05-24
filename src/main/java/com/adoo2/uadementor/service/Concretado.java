package com.adoo2.uadementor.service;

import com.adoo2.uadementor.model.Tutor;
import com.adoo2.uadementor.model.Alumno;
import com.adoo2.uadementor.model.SesionMentoria;

public class Concretado implements IEstadoSesion {
    private Tutor tutor;
    private Alumno alumno;

    @Override
    public void aceptar(Tutor tutor, Alumno alumno, SesionMentoria sesionMentoria) {
        System.out.println("la sesion ya concreto");
    }

    @Override
    public void cancelar(Tutor tutor, Alumno alumno, SesionMentoria sesionMentoria) {
        System.out.println("la sesion ya concreto");
    }

    @Override
    public void concretar(Tutor tutor, Alumno alumno, SesionMentoria sesionMentoria) {
        System.out.println("la sesion ya concreto");
    }

    @Override
    public void reservar(Tutor tutor, Alumno alumno, SesionMentoria sesionMentoria) {
        System.out.println("la sesion ya concreto");
    }
}


