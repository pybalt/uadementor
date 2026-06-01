package com.adoo2.uadementor.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.adoo2.uadementor.model.SesionMentoria;

import java.util.List;

@Repository
public interface SesionMentoriaRepository extends JpaRepository<SesionMentoria, Long> {
    List<SesionMentoria> findByAlumnoId(Long alumnoId);
    List<SesionMentoria> findByTutorId(Long tutorId);
}
