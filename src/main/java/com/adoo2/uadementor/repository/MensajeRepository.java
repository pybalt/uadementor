package com.adoo2.uadementor.repository;

import com.adoo2.uadementor.model.Mensaje;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MensajeRepository extends CrudRepository<Mensaje, Long> {
    List<Mensaje> findAll();
    Mensaje findById(long id);
}


