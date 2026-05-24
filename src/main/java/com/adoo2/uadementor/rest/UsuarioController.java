package com.adoo2.uadementor.rest;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.adoo2.uadementor.model.Calificacion;
import com.adoo2.uadementor.model.CalificacionLogro;
import com.adoo2.uadementor.model.Tutor;
import com.adoo2.uadementor.model.Logro;
import com.adoo2.uadementor.model.LogroExito;
import com.adoo2.uadementor.model.LogroResena;
import com.adoo2.uadementor.model.Alumno;
import com.adoo2.uadementor.model.Usuario;
import com.adoo2.uadementor.rest.dto.CalificacionRequest;
import com.adoo2.uadementor.service.CalificacionService;
import com.adoo2.uadementor.service.TutorService;
import com.adoo2.uadementor.service.LogroService;
import com.adoo2.uadementor.service.AlumnoService;
import com.adoo2.uadementor.service.UsuarioService;

import jakarta.persistence.Transient;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;
    @Autowired
    private TutorService tutorService;

    @Autowired
    private AlumnoService alumnoService;
    @Autowired
    private CalificacionService calificacionService;
    @Autowired
    @Transient
    private LogroService logroService;
    @GetMapping
    public List<Usuario> getAllUsuarios() {
        return usuarioService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Usuario> getUsuarioById(@PathVariable Long id) {
        return usuarioService.findById(id);
    }

    @PostMapping
    public Usuario createUsuario(@RequestBody Usuario usuario) {
        return usuarioService.save(usuario);
    }

    @PostMapping("/tutor")
    public Usuario createTutor(@RequestBody Tutor tutor) {
        return tutorService.save(tutor);
    }

    @PostMapping("/agregarLogrosObservadores")
    public boolean agregarLogrosObservadores() {
        LogroExito logroExito = new LogroExito();
        LogroResena logroResena = new LogroResena();
        Calificacion.agregarObservador(logroExito);
        Calificacion.agregarObservador(logroResena);

        return true;
    }
    @PostMapping("/validarObservadores")
    public  List<Logro> validarObservadores() {
        return Calificacion.devolverObservadores();
    }

    @PostMapping("/generarCalificacion")
    public  CalificacionLogro generarCalificacion(@RequestBody CalificacionRequest request) {
        System.out.println("--------------------------------------------------------------------------------");
        Long tutorId = request.tutorId;
        Long alumnoId = request.alumnoId;
        int puntaje = request.puntaje;
        String comentario = request.comentario;
        Tutor tutor = tutorService.findById(tutorId).get();
        Alumno alumno = alumnoService.buscarAlumno(alumnoId);
        CalificacionLogro cl = Calificacion.generarCalificacion(tutor, alumno, puntaje, comentario,calificacionService);
        List<Logro> listaLogro = cl.getLogro();
        for (Logro logro : listaLogro) {
            if(logro!=null){
                logroService.save(logro);
            }
        }
        calificacionService.save(cl.getCalificacion());
        return cl;
}

    @GetMapping("/CalificacionesAlumno/{id}")
    public List<Calificacion>getCalificacionByAlumnoId(@PathVariable Long id) {
        return calificacionService.buscarCalificacionPorAlumno(id);
    }
    @GetMapping("/CalificacionesTutor/{id}")
    public List<Calificacion> getCalificacionByTutorId(@PathVariable Long id) {
        return calificacionService.buscarCalificacionPorTutor(id);
    }

    @DeleteMapping("/{id}")
    public void deleteUsuario(@PathVariable Long id) {
        usuarioService.deleteById(id);
    }
}


