package com.adoo2.uadementor.service;

import com.adoo2.uadementor.model.Alumno;
import com.adoo2.uadementor.model.Tutor;
import org.springframework.stereotype.Service;

@Service
public class Firebird implements IAdapterPush {
    @Override
    public void enviarNotificacion(Alumno alumno) {
        System.out.println("Enviando notificacion con Firebird a: " + alumno.getEmail());
    }

    @Override
    public void enviarCalificacion(Alumno alumno, Tutor tutor) {
        System.out.println("Enviando calificacion con Firebird a: " + alumno.getEmail() + " sobre el tutor: " + tutor.getEmail());
    }
}


