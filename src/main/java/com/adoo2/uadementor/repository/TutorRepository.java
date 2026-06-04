package com.adoo2.uadementor.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.adoo2.uadementor.model.Tutor;

@Repository
public interface TutorRepository extends JpaRepository<Tutor, Long> {
    List<Tutor> findByNombreContainingOrApellidoContaining(String nombre, String apellido);
    Tutor findById(long id);
    List<Tutor> findAll();

    @Query("SELECT DISTINCT t FROM Tutor t LEFT JOIN t.materias m WHERE " +
           "LOWER(t.nombre) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
           "LOWER(t.apellido) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
           "LOWER(m.descripcion) LIKE LOWER(CONCAT('%', :q, '%'))")
    List<Tutor> buscarPorNombreApellidoOMateria(@Param("q") String q);
}


