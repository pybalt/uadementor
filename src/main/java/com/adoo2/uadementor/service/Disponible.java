package com.adoo2.uadementor.service;

import com.adoo2.uadementor.model.Tutor;
import com.adoo2.uadementor.model.Reserva;
import com.adoo2.uadementor.model.Alumno;
import com.adoo2.uadementor.model.SesionMentoria;

public class Disponible implements IEstadoSesion {
    @Override
    public void aceptar(Tutor tutor, Alumno alumno, SesionMentoria sesionMentoria) {
        System.out.println("no se puede aceptar, ya que no se encuentra en reservado");
    }

    @Override
    public void cancelar(Tutor tutor, Alumno alumno, SesionMentoria sesionMentoria) {
        System.out.println("no se puede cancelar, ya que no se encuentra en reservado o aceptado");
    }

    @Override
    public void concretar(Tutor tutor, Alumno alumno, SesionMentoria sesionMentoria) {
        System.out.println("no se puede concretar, ya que no se encuentra en aceptado");
    }

    @Override
    public void reservar(Tutor tutor, Alumno alumno, SesionMentoria sesionMentoria) {
        Reservado estado = new Reservado();
        sesionMentoria.setEstadoSesion(estado);
        sesionMentoria.setEstado("Reservado");
    }
}


