package com.adoo2.uadementor.service;

import com.adoo2.uadementor.model.Reserva;
import com.adoo2.uadementor.repository.ReservaRepository;
import com.adoo2.uadementor.repository.AlumnoRepository;
import com.adoo2.uadementor.repository.TutorRepository;
import com.adoo2.uadementor.rest.dto.CrearReservaDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservaService {
    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private AlumnoRepository alumnoRepository;

    @Autowired
    private TutorRepository tutorRepository;

    public List<Reserva> getAllReservas() {
        return reservaRepository.findAll();
    }

    public Reserva createReserva(CrearReservaDTO crearReservaDTO) {
        Reserva reserva = new Reserva();
        reserva.setAlumno(alumnoRepository.findById(crearReservaDTO.getAlumnoId()).orElse(null));
        reserva.setTutor(tutorRepository.findById(crearReservaDTO.getTutorId()).orElse(null));
        reserva.setFechaHora(crearReservaDTO.getFechaHora());
        reserva.setEstado(new Pendiente());
        return reservaRepository.save(reserva);
    }
}


