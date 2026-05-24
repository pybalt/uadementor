package com.adoo2.uadementor.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.adoo2.uadementor.model.Tutor;

@Repository
public interface TutorRepository extends JpaRepository<Tutor, Long> {
    List<Tutor> findByNombreContainingOrApellidoContaining(String nombre, String apellido);
    Tutor findById(long id);
    List<Tutor> findAll();
}


