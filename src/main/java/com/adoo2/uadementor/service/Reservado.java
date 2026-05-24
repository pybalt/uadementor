package com.adoo2.uadementor.service;

import com.adoo2.uadementor.model.Tutor;
import com.adoo2.uadementor.model.Alumno;
import com.adoo2.uadementor.model.SesionMentoria;

public class Reservado implements IEstadoSesion {
    private Tutor tutorReservado;
    private Alumno alumno;

    @Override
    public void aceptar(Tutor tutor, Alumno alumno, SesionMentoria sesionMentoria) {
        Aceptado estado = new Aceptado();
        sesionMentoria.setEstadoSesion(estado);
        sesionMentoria.setEstado("Aceptado");
    }

    @Override
    public void cancelar(Tutor tutor, Alumno alumno, SesionMentoria sesionMentoria) {
        Disponible estado = new Disponible();
        sesionMentoria.setEstadoSesion(estado);
    }

    @Override
    public void concretar(Tutor tutor, Alumno alumno, SesionMentoria sesionMentoria) {
        System.out.println("no se puede concretar, ya que no se encuentra en aceptado");
    }

    @Override
    public void reservar(Tutor tutor, Alumno alumno, SesionMentoria sesionMentoria) {
        System.out.println("ya se encuentra en reservado");
    }
}


