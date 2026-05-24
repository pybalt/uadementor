package com.adoo2.uadementor.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.adoo2.uadementor.model.Alumno;
import com.adoo2.uadementor.repository.AlumnoRepository;

@Service
public class AlumnoService {
    @Autowired
    private AlumnoRepository alumnoRepository;

    public List<Alumno> obtenerAlumnos(Alumno alumno) {
        return alumnoRepository.findAll();
    }

    public Alumno save(Alumno alumno) {
        return alumnoRepository.save(alumno);
    }

    public Alumno buscarAlumno(long id) {
        return alumnoRepository.findById(id);
    }
}


