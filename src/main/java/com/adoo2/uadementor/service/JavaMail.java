package com.adoo2.uadementor.service;

import com.adoo2.uadementor.model.Alumno;
import com.adoo2.uadementor.model.Usuario;
import com.adoo2.uadementor.model.Tutor;
import org.springframework.stereotype.Service;

@Service
public class JavaMail implements IAdapterMail {
    @Override
    public void enviarNotificacion(Usuario usuario) {
        System.out.println("Enviando notificaciÃƒÂ³n con JavaMail a: " + usuario.getEmail());
    }

    @Override
    public void enviarCalificacion(Alumno alumno, Tutor tutor) {
        System.out.println("Enviando calificaciÃƒÂ³n con JavaMail a: " + alumno.getEmail() + " sobre el tutor: " + tutor.getEmail());
    }
}


