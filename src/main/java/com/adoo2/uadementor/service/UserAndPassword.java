package com.adoo2.uadementor.service;

import com.adoo2.uadementor.rest.dto.UsuarioAlumnoDTO;
import com.adoo2.uadementor.rest.dto.UsuarioTutorDTO;

public class UserAndPassword implements MedioRegistro {
    @Override
    public void agregarAlumno(UsuarioAlumnoDTO usuarioDTO) {}

    @Override
    public void agregarTutor(UsuarioTutorDTO usuarioDTO) {}

    @Override
    public void login(UsuarioAlumnoDTO usuarioDTO) {}
}


