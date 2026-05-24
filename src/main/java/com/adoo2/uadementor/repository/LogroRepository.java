package com.adoo2.uadementor.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.adoo2.uadementor.model.Logro;

public interface LogroRepository extends CrudRepository<Logro, Long> {
    List<Logro> findAll();
    Logro findById(long id);

    List<Logro> findByUsuarioId(Long usuario_id);
}


