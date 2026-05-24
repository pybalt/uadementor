package com.adoo2.uadementor.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.adoo2.uadementor.model.Calificacion;
import com.adoo2.uadementor.repository.CalificacionRepository;

@Service
public class CalificacionService {
    @Autowired
    private CalificacionRepository calificacionRepository;

    public List<Calificacion> obtenerCalificaciones(Calificacion calificacion) {
        return calificacionRepository.findAll();
    }

    public Calificacion save(Calificacion calificacion) {
        return calificacionRepository.save(calificacion);
    }

    public Calificacion buscarCalificacion(long id) {
        return calificacionRepository.findById(id);
    }

    public List<Calificacion> buscarCalificacionPorTutor(Long id) {
        return calificacionRepository.findByTutorId(id);
    }
    public List<Calificacion> buscarCalificacionPorAlumno(Long id) {
        return calificacionRepository.findByAlumnoId(id);
    }
    public List<Calificacion> buscarCalificacionPorAlumnoYTutor(Long alumnoId, Long tutorId) {
        return calificacionRepository.findByAlumnoIdAndTutorId(alumnoId, tutorId);
    }
}


