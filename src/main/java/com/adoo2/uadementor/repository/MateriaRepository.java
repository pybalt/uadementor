package com.adoo2.uadementor.repository;

import com.adoo2.uadementor.model.Servicio;
import com.adoo2.uadementor.model.Materia;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MateriaRepository extends CrudRepository<Materia, Long> {
    List<Materia> findAll();

    Servicio findById(long id);
}


