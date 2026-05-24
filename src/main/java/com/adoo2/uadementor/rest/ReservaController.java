package com.adoo2.uadementor.rest;

import com.adoo2.uadementor.model.Reserva;
import com.adoo2.uadementor.rest.dto.CrearReservaDTO;
import com.adoo2.uadementor.service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservas")
public class ReservaController {
    @Autowired
    private ReservaService reservaService;

    @GetMapping
    public List<Reserva> getAllReservas() {
        return reservaService.getAllReservas();
    }

    @PostMapping
    public Reserva createReserva(@RequestBody CrearReservaDTO crearReservaDTO) {
        return reservaService.createReserva(crearReservaDTO);
    }
}


