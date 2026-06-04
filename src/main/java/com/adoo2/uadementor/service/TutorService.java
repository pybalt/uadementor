package com.adoo2.uadementor.service;

import java.util.List;
import java.util.Optional;

import com.adoo2.uadementor.model.Calificacion;
import com.adoo2.uadementor.model.Tutor;
import com.adoo2.uadementor.repository.TutorRepository;
import com.adoo2.uadementor.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TutorService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private TutorRepository tutorRepository;

    public List<Tutor> obtenerTutor(Tutor tutor) {
        return tutorRepository.findAll();
    }

    public Tutor save(Tutor tutor) {
        return tutorRepository.save(tutor);
    }

    public void agregarCalificacion(Calificacion calificacion, Long tutorId) {
        Optional<Tutor> tutorOptional = tutorRepository.findById(tutorId);
        if (tutorOptional.isPresent()) {
            Tutor tutor = tutorOptional.get();
            tutor.getListaCalificaciones().add(calificacion);
            calificacion.setTutor(tutor);
            usuarioRepository.save(tutor);
        }
    }

    public List<Tutor> buscarTutor(String nombre, String apellido) {
        return tutorRepository.findByNombreContainingOrApellidoContaining(nombre, apellido);
    }

    public List<Tutor> buscarPorQuery(String q) {
        return tutorRepository.buscarPorNombreApellidoOMateria(q);
    }

    public Optional<Tutor> findById(Long id) {
        return tutorRepository.findById(id);
    }
}


