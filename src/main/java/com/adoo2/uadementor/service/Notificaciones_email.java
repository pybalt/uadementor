package com.adoo2.uadementor.service;

import com.adoo2.uadementor.model.Alumno;
import com.adoo2.uadementor.model.Usuario;
import com.adoo2.uadementor.model.Tutor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Notificaciones_email implements INotificacion {
    @Autowired
    private IAdapterMail adapterMail;

    @Override
    public void enviarNotificacion(Usuario usuario) {
        adapterMail.enviarNotificacion(usuario);
    }

    @Override
    public void enviarNotificacion(Alumno alumno) {
        adapterMail.enviarNotificacion(alumno);
    }

    @Override
    public void enviarCalificacion(Alumno alumno, Tutor tutor) {
        adapterMail.enviarCalificacion(alumno, tutor);
    }
}


