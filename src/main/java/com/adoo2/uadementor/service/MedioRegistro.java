package com.adoo2.uadementor.service;

import com.adoo2.uadementor.rest.dto.UsuarioTutorDTO;
import com.adoo2.uadementor.rest.dto.UsuarioAlumnoDTO;

public interface MedioRegistro {
    void agregarAlumno(UsuarioAlumnoDTO usuarioDTO);
    void agregarTutor(UsuarioTutorDTO usuarioDTO);
    void login(UsuarioAlumnoDTO usuarioDTO);
}


