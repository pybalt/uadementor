package com.adoo2.uadementor.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.adoo2.uadementor.model.SesionMentoria;

@Repository
public interface SesionMentoriaRepository extends CrudRepository<SesionMentoria, Long> {}


