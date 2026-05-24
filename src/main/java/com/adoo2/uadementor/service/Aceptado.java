package com.adoo2.uadementor.service;

import com.adoo2.uadementor.model.Tutor;
import com.adoo2.uadementor.model.Reserva;
import com.adoo2.uadementor.model.Alumno;
import com.adoo2.uadementor.model.SesionMentoria;

public class Aceptado implements IEstadoSesion {
    @Override
    public void aceptar(Tutor tutor, Alumno alumno, SesionMentoria sesionMentoria) {
        System.out.println("ya se encuentra aceptado");
    }

    @Override
    public void cancelar(Tutor tutor, Alumno alumno, SesionMentoria sesionMentoria) {
        Disponible estado = new Disponible();
        sesionMentoria.setEstadoSesion(estado);
    }

    @Override
    public void concretar(Tutor tutor, Alumno alumno, SesionMentoria sesionMentoria) {
        IEstadoSesion estado = new Concretado();
        sesionMentoria.setEstadoSesion(estado);
        sesionMentoria.setEstado("Concretado");
    }

    @Override
    public void reservar(Tutor tutor, Alumno alumno, SesionMentoria sesionMentoria) {
        System.out.println("ya se encuentra reservado y aceptado");
    }
}


