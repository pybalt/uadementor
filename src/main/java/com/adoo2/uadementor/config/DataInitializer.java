package com.adoo2.uadementor.config;

import com.adoo2.uadementor.model.*;
import com.adoo2.uadementor.repository.*;
import com.adoo2.uadementor.service.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

/**
 * Carga datos de prueba al iniciar la aplicación con el perfil "h2".
 * Solo se ejecuta en desarrollo local — nunca en producción.
 *
 * Usuarios precargados:
 *   Alumnos : alumno1@demo.com / password123
 *             alumno2@demo.com / password123
 *   Tutores : tutor1@demo.com  / password123
 *             tutor2@demo.com  / password123
 *             tutor3@demo.com  / password123
 */
@Slf4j
@Component
@Profile("h2")
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final AlumnoRepository alumnoRepository;
    private final TutorRepository tutorRepository;
    private final MateriaRepository materiaRepository;
    private final CalificacionRepository calificacionRepository;
    private final SesionMentoriaRepository sesionMentoriaRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        log.info("=== DataInitializer: cargando datos de prueba ===");

        // ----------------------------------------------------------------
        // 1. Materias
        // ----------------------------------------------------------------
        Materia algebra1 = new Materia();
        algebra1.setDescripcion("Álgebra y Geometría Analítica");
        algebra1.setZona("UADE - Buenos Aires");
        algebra1.setIdiomas(List.of("Español"));
        algebra1.setTamMaxGrupo(5);

        Materia programacion1 = new Materia();
        programacion1.setDescripcion("Programación Orientada a Objetos");
        programacion1.setZona("UADE - Buenos Aires");
        programacion1.setIdiomas(List.of("Español", "Inglés"));
        programacion1.setTamMaxGrupo(4);

        Materia estadistica1 = new Materia();
        estadistica1.setDescripcion("Estadística y Probabilidad");
        estadistica1.setZona("UADE - Buenos Aires");
        estadistica1.setIdiomas(List.of("Español"));
        estadistica1.setTamMaxGrupo(6);

        Materia bases1 = new Materia();
        bases1.setDescripcion("Bases de Datos");
        bases1.setZona("UADE - Buenos Aires");
        bases1.setIdiomas(List.of("Español", "Inglés"));
        bases1.setTamMaxGrupo(5);

        Materia redes1 = new Materia();
        redes1.setDescripcion("Redes y Comunicaciones");
        redes1.setZona("UADE - Buenos Aires");
        redes1.setIdiomas(List.of("Español"));
        redes1.setTamMaxGrupo(4);

        Materia programacion2 = new Materia();
        programacion2.setDescripcion("Programación Orientada a Objetos");
        programacion2.setZona("UADE - Buenos Aires");
        programacion2.setIdiomas(List.of("Español"));
        programacion2.setTamMaxGrupo(4);

        Materia bases2 = new Materia();
        bases2.setDescripcion("Bases de Datos");
        bases2.setZona("UADE - Buenos Aires");
        bases2.setIdiomas(List.of("Español"));
        bases2.setTamMaxGrupo(5);

        materiaRepository.saveAll(List.of(algebra1, programacion1, estadistica1, bases1, redes1, programacion2, bases2));
        log.info("  -> 7 materias creadas");

        // ----------------------------------------------------------------
        // 2. Tutores
        // ----------------------------------------------------------------
        String pass = passwordEncoder.encode("password123");

        Tutor tutor1 = new Tutor();
        tutor1.setNombre("Carlos");
        tutor1.setApellido("Ramírez");
        tutor1.setDni(30111222);
        tutor1.setEmail("tutor1@demo.com");
        tutor1.setPass(pass);
        tutor1.setTelefono(1155551001);
        tutor1.setRole("TUTOR");
        tutor1.setCiudadesServicio(List.of("Buenos Aires", "Online"));
        tutor1.setMaterias(List.of(algebra1, programacion1));

        Tutor tutor2 = new Tutor();
        tutor2.setNombre("Laura");
        tutor2.setApellido("González");
        tutor2.setDni(30222333);
        tutor2.setEmail("tutor2@demo.com");
        tutor2.setPass(pass);
        tutor2.setTelefono(1155551002);
        tutor2.setRole("TUTOR");
        tutor2.setCiudadesServicio(List.of("Buenos Aires", "Online"));
        tutor2.setMaterias(List.of(estadistica1, bases1));

        Tutor tutor3 = new Tutor();
        tutor3.setNombre("Martín");
        tutor3.setApellido("López");
        tutor3.setDni(30333444);
        tutor3.setEmail("tutor3@demo.com");
        tutor3.setPass(pass);
        tutor3.setTelefono(1155551003);
        tutor3.setRole("TUTOR");
        tutor3.setCiudadesServicio(List.of("Buenos Aires", "La Plata", "Online"));
        tutor3.setMaterias(List.of(redes1, programacion2, bases2));

        tutorRepository.saveAll(List.of(tutor1, tutor2, tutor3));
        log.info("  -> 3 tutores creados (tutor1@demo.com, tutor2@demo.com, tutor3@demo.com)");

        // ----------------------------------------------------------------
        // 3. Alumnos
        // ----------------------------------------------------------------
        Alumno alumno1 = new Alumno();
        alumno1.setNombre("Juan");
        alumno1.setApellido("Pérez");
        alumno1.setDni(40111222);
        alumno1.setEmail("alumno1@demo.com");
        alumno1.setPass(pass);
        alumno1.setTelefono(1155552001);
        alumno1.setRole("ALUMNO");
        alumno1.setPuntuacion(0);
        alumno1.setDestinosFav(List.of("Álgebra", "Programación"));

        Alumno alumno2 = new Alumno();
        alumno2.setNombre("María");
        alumno2.setApellido("García");
        alumno2.setDni(40222333);
        alumno2.setEmail("alumno2@demo.com");
        alumno2.setPass(pass);
        alumno2.setTelefono(1155552002);
        alumno2.setRole("ALUMNO");
        alumno2.setPuntuacion(0);
        alumno2.setDestinosFav(List.of("Estadística", "Bases de Datos"));

        alumnoRepository.saveAll(List.of(alumno1, alumno2));
        log.info("  -> 2 alumnos creados (alumno1@demo.com, alumno2@demo.com)");

        // ----------------------------------------------------------------
        // 4. Calificaciones de ejemplo
        // ----------------------------------------------------------------
        Calificacion cal1 = new Calificacion();
        cal1.setTutor(tutor1);
        cal1.setAlumno(alumno1);
        cal1.setPuntaje(5);
        cal1.setComentario("Excelente tutor, explica muy bien los conceptos de POO.");
        cal1.setFecha(new Date());

        Calificacion cal2 = new Calificacion();
        cal2.setTutor(tutor1);
        cal2.setAlumno(alumno2);
        cal2.setPuntaje(4);
        cal2.setComentario("Muy buen manejo del tema, recomendado.");
        cal2.setFecha(new Date());

        Calificacion cal3 = new Calificacion();
        cal3.setTutor(tutor2);
        cal3.setAlumno(alumno1);
        cal3.setPuntaje(5);
        cal3.setComentario("Laura explica estadística de forma muy clara.");
        cal3.setFecha(new Date());

        calificacionRepository.saveAll(List.of(cal1, cal2, cal3));
        log.info("  -> 3 calificaciones de ejemplo creadas");

        // ----------------------------------------------------------------
        // 5. Sesiones de mentoria de prueba
        // ----------------------------------------------------------------
        SesionMentoria sesion1 = new SesionMentoria();
        sesion1.setFechaInicio(new Date());
        sesion1.setFechaFin(new Date());
        sesion1.setComisionDePlataforma(5.0);
        sesion1.setAnticipo(10.0);
        sesion1.setTotal(50.0);
        sesion1.setTutor(tutor1);
        sesion1.setAlumno(alumno1);
        sesion1.setMateria(algebra1);
        sesion1.setEstado("Reservado");
        sesionMentoriaRepository.save(sesion1);
        log.info("  -> 1 sesión de mentoría de prueba creada (Reservado)");

        log.info("=== DataInitializer: listo. Contraseña de todos los usuarios: password123 ===");
    }
}
