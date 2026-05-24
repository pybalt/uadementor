package com.adoo2.uadementor.repository;

import com.adoo2.uadementor.model.Usuario;
import org.springframework.data.repository.CrudRepository;
import java.util.Optional;
import java.util.List;

public interface UsuarioRepository extends CrudRepository<Usuario, Long> {
    List<Usuario> findAll();

    Optional<Usuario> findById(Long id);

    Optional<Usuario> findByEmail(String email);
}


