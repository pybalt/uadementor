package com.adoo2.uadementor.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.adoo2.uadementor.rest.dto.CrearSesionRequest;
import com.adoo2.uadementor.model.SesionMentoria;
import com.adoo2.uadementor.service.SesionMentoriaService;

@RestController
@RequestMapping("/sesiones-mentoria")
public class SesionMentoriaController {
    @Autowired
    private SesionMentoriaService sesionMentoriaService;

    @PostMapping
    public ResponseEntity<SesionMentoria> crearSesion(@RequestBody CrearSesionRequest request) {
        try {
            SesionMentoria nuevaSesion = sesionMentoriaService.crearSesionMentoria(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevaSesion);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PutMapping("/{id}/aceptar")
    public ResponseEntity<SesionMentoria> aceptar(@PathVariable Long id) {
        try {
            SesionMentoria sesion = sesionMentoriaService.aceptarSesion(id);
            return ResponseEntity.ok(sesion);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PutMapping("/{id}/concretar")
    public ResponseEntity<SesionMentoria> concretar(@PathVariable Long id) {
        try {
            SesionMentoria sesion = sesionMentoriaService.concretarSesion(id);
            return ResponseEntity.ok(sesion);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PutMapping("/{id}/reservar")
    public ResponseEntity<SesionMentoria> reservar(@PathVariable Long id) {
        try {
            SesionMentoria sesion = sesionMentoriaService.reservarSesion(id);
            return ResponseEntity.ok(sesion);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PostMapping("/{id}/abonar-reserva")
    public ResponseEntity<SesionMentoria> abonarReserva(@PathVariable Long id) {
        try {
            SesionMentoria sesion = sesionMentoriaService.abonarReserva(id);
            return ResponseEntity.ok(sesion);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PostMapping("/{id}/abonar-total")
    public ResponseEntity<SesionMentoria> abonarTotal(@PathVariable Long id) {
        try {
            SesionMentoria sesion = sesionMentoriaService.abonarTotal(id);
            return ResponseEntity.ok(sesion);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
}


