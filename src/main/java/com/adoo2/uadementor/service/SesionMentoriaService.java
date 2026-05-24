package com.adoo2.uadementor.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.adoo2.uadementor.rest.dto.CrearSesionRequest;
import com.adoo2.uadementor.model.*;
import com.adoo2.uadementor.repository.*;

@Service
public class SesionMentoriaService {
        @Autowired
        private SesionMentoriaRepository sesionMentoriaRepository;

        @Autowired
        private TutorRepository tutorRepository;

        @Autowired
        private AlumnoRepository alumnoRepository;

        @Autowired
        private MateriaRepository materiaRepository;

        @Autowired
        private FacturaRepository facturaRepository;

        @Transactional
        public SesionMentoria crearSesionMentoria(CrearSesionRequest request) {
                Tutor tutor = tutorRepository.findById(request.getTutorId())
                                .orElseThrow(() -> new IllegalArgumentException("Tutor no encontrado"));
                System.out.println(tutor.getApellido());
                Alumno alumno = alumnoRepository.findById(request.getAlumnoId())
                                .orElseThrow(() -> new IllegalArgumentException("Alumno no encontrado"));
                System.out.println(alumno.getApellido());

                SesionMentoria sesionMentoria = new SesionMentoria();
                sesionMentoria.setFechaInicio(request.getFechaInicio());
                sesionMentoria.setFechaFin(request.getFechaFin());
                sesionMentoria.setComisionDePlataforma(request.getComisionDePlataforma());
                sesionMentoria.setAnticipo(request.getAnticipo());
                sesionMentoria.setTotal(request.getTotal());
                sesionMentoria.setTutor(tutor);
                sesionMentoria.setAlumno(alumno);

                sesionMentoria.setEstadoSesion(new Disponible());
                sesionMentoria.setEstado("Disponible");

                return sesionMentoriaRepository.save(sesionMentoria);
        }

        @Transactional
        public SesionMentoria aceptarSesion(Long id) {
                SesionMentoria sesionMentoria = sesionMentoriaRepository.findById(id)
                                .orElseThrow(() -> new IllegalArgumentException("SesionMentoria no encontrada"));
                Tutor tutor = sesionMentoria.getTutor();
                Alumno alumno = sesionMentoria.getAlumno();
                sesionMentoria.setEstadoSesion(getEstadoSesion(sesionMentoria.getEstado()));
                sesionMentoria.aceptar(tutor, alumno);
                return sesionMentoriaRepository.save(sesionMentoria);
        }

        @Transactional
        public SesionMentoria concretarSesion(Long id) {
                SesionMentoria sesionMentoria = sesionMentoriaRepository.findById(id)
                                .orElseThrow(() -> new IllegalArgumentException("SesionMentoria no encontrada"));
                Tutor tutor = sesionMentoria.getTutor();
                Alumno alumno = sesionMentoria.getAlumno();
                sesionMentoria.setEstadoSesion(getEstadoSesion(sesionMentoria.getEstado()));
                sesionMentoria.concretar(tutor, alumno);
                return sesionMentoriaRepository.save(sesionMentoria);
        }

        @Transactional
        public SesionMentoria abonarReserva(Long id) {
                SesionMentoria sesionMentoria = sesionMentoriaRepository.findById(id)
                                .orElseThrow(() -> new IllegalArgumentException("SesionMentoria no encontrada"));

                if (sesionMentoria.getFactura() == null) {
                        Factura factura = new Factura();
                        factura.setEstado(new ReservaImpaga());
                        factura.setEstadoFactura("ReservaImpaga");
                        factura.setComisionDePlataforma(sesionMentoria.getComisionDePlataforma());
                        factura.setMontoTotal(sesionMentoria.getTotal());
                        factura.setAnticipo(sesionMentoria.getAnticipo());
                        factura.pagar();
                        Factura savedFactura = facturaRepository.save(factura);
                        sesionMentoria.setFactura(savedFactura);
                        return sesionMentoriaRepository.save(sesionMentoria);
                } else {
                        Factura factura = sesionMentoria.getFactura();
                        factura.setEstado(getEstadoFactura(factura.getEstadoFactura()));
                        factura.pagar();
                        facturaRepository.save(factura);
                        return sesionMentoriaRepository.save(sesionMentoria);
                }
        }

        @Transactional
        public SesionMentoria abonarTotal(Long id) {
                SesionMentoria sesionMentoria = sesionMentoriaRepository.findById(id)
                                .orElseThrow(() -> new IllegalArgumentException("SesionMentoria no encontrada"));
                Factura factura = sesionMentoria.getFactura();

                if (factura.getEstadoFactura().equals("ReservaPaga")) {
                        factura.setEstado(new TotalImpago());
                        factura.setEstadoFactura("TotalImpago");
                        factura.pagar();
                        facturaRepository.save(factura);
                        return sesionMentoriaRepository.save(sesionMentoria);
                }
                factura.setEstado(getEstadoFactura(factura.getEstadoFactura()));
                factura.pagar();
                facturaRepository.save(factura);
                return sesionMentoriaRepository.save(sesionMentoria);
        }

        public SesionMentoria reservarSesion(Long id) {
                SesionMentoria sesionMentoria = sesionMentoriaRepository.findById(id)
                                .orElseThrow(() -> new IllegalArgumentException("SesionMentoria no encontrada"));
                Tutor tutor = sesionMentoria.getTutor();
                Alumno alumno = sesionMentoria.getAlumno();
                sesionMentoria.setEstadoSesion(getEstadoSesion(sesionMentoria.getEstado()));
                sesionMentoria.reservar(tutor, alumno);
                return sesionMentoriaRepository.save(sesionMentoria);
        }

        public IEstadoSesion getEstadoSesion(String estado) {
                switch (estado) {
                        case "Aceptado":
                                return new Aceptado();
                        case "Reservado":
                                return new Reservado();
                        case "Concretado":
                                return new Concretado();
                        default:
                                return new Disponible();
                }
        }

        public IEstado getEstadoFactura(String estado) {
                switch (estado) {
                        case "ReservaPaga":
                                return new ReservaPaga();
                        case "ReservaImpaga":
                                return new ReservaImpaga();
                        case "TotalPago":
                                return new TotalPago();
                        default:
                                return new TotalImpago();
                }
        }
}


