package com.adoo2.uadementor.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.adoo2.uadementor.model.Calificacion;

public interface CalificacionRepository extends CrudRepository<Calificacion, Long> {
    List<Calificacion> findAll();
    Calificacion findById(long id);

    List<Calificacion> findByTutorId(Long tutorId);
    List<Calificacion> findByAlumnoId(Long alumnoId);
    List<Calificacion> findByAlumnoIdAndTutorId(Long alumnoId, Long tutorId);
}


