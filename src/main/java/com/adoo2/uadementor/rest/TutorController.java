package com.adoo2.uadementor.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.adoo2.uadementor.model.Calificacion;
import com.adoo2.uadementor.model.Tutor;
import com.adoo2.uadementor.service.TutorService;

import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/tutores")
public class TutorController {
    @Autowired
    private TutorService tutorService;

    @GetMapping
    public List<Tutor> obtenerTutores() {
        return tutorService.obtenerTutor(null);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tutor> obtenerTutorPorId(@PathVariable Long id) {
        return tutorService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{tutorId}/calificaciones")
    public void agregarCalificacion(@PathVariable Long tutorId, @RequestBody Calificacion calificacion) {
        tutorService.agregarCalificacion(calificacion, tutorId);
    }

    @GetMapping("/buscar")
    public List<Tutor> buscarTutor(@RequestParam String nombre, @RequestParam(defaultValue = "") String apellido) {
        return tutorService.buscarTutor(nombre, apellido);
    }
}


