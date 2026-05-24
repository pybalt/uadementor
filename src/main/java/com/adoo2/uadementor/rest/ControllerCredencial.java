package com.adoo2.uadementor.rest;

import com.adoo2.uadementor.model.Credencial;
import com.adoo2.uadementor.service.IAdapterVerificadorCredencial;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/credenciales")
public class ControllerCredencial {
    @Autowired
    private IAdapterVerificadorCredencial adapter;

    @PostMapping("/verificar")
    public boolean verificarCredencial(@RequestBody Credencial credencial) {
        return adapter.verificarCredencial(credencial);
    }

    @PostMapping("/agregar")
    public void agregarCredencial(@RequestBody Credencial credencial) {}

    @DeleteMapping("/eliminar")
    public void eliminarCredencial(@RequestBody Credencial credencial) {}
}


