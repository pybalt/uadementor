package com.adoo2.uadementor.repository;

import com.adoo2.uadementor.model.Alumno;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface AlumnoRepository extends CrudRepository<Alumno, Long> {
    List<Alumno> findAll();
    Alumno findById(long id);
}


