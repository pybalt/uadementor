package com.adoo2.uadementor.service;

import com.adoo2.uadementor.model.Alumno;
import com.adoo2.uadementor.model.Usuario;
import com.adoo2.uadementor.model.Tutor;
import org.springframework.stereotype.Service;

@Service
public class Notificaciones_push implements INotificacion {
    @Override
    public void enviarNotificacion(Usuario usuario) {
        System.out.println("Enviando notificaciÃƒÂ³n push a: " + usuario.getEmail());
    }

    @Override
    public void enviarNotificacion(Alumno alumno) {
        System.out.println("Enviando notificaciÃƒÂ³n push a: " + alumno.getEmail());
    }

    @Override
    public void enviarCalificacion(Alumno alumno, Tutor tutor) {
        System.out.println("Enviando calificaciÃƒÂ³n por notificaciÃƒÂ³n push a: " + alumno.getEmail() + " sobre el tutor: " + tutor.getEmail());
    }
}


