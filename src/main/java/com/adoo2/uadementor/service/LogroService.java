package com.adoo2.uadementor.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.adoo2.uadementor.model.Logro;
import com.adoo2.uadementor.repository.LogroRepository;

@Service
public class LogroService {
    @Autowired
    private LogroRepository logroRepository;

    public List<Logro> obtenerLogros() {
        return logroRepository.findAll();
    }

    public Logro save(Logro logro) {
        return logroRepository.save(logro);
    }

    public Logro buscarCalificacion(long id) {
        return logroRepository.findById(id);
    }

    public List<Logro> buscarLogroPorUsuario(Long id) {
        return logroRepository.findByUsuarioId(id);
    }
}


