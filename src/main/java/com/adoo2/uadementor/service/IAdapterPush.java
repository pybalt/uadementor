package com.adoo2.uadementor.service;

import com.adoo2.uadementor.model.Alumno;
import com.adoo2.uadementor.model.Tutor;

public interface IAdapterPush {
    void enviarNotificacion(Alumno alumno);
    void enviarCalificacion(Alumno alumno, Tutor tutor);
}


