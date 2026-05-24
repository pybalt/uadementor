package com.adoo2.uadementor.service;

import com.adoo2.uadementor.model.Alumno;
import com.adoo2.uadementor.model.Usuario;
import com.adoo2.uadementor.model.Tutor;

public interface IAdapterMail {
    void enviarNotificacion(Usuario usuario);
    void enviarCalificacion(Alumno alumno, Tutor tutor);
}


