package com.adoo2.uadementor.rest;

import com.adoo2.uadementor.rest.dto.MentoriaIndividualDTO;
import com.adoo2.uadementor.rest.dto.MentoriaGrupalDTO;
import com.adoo2.uadementor.rest.dto.TraduccionDTO;
import com.adoo2.uadementor.service.MateriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/materias")
public class MateriaController {
    @Autowired
    private MateriaService materiaService;

    @PostMapping("/individual")
    public void agregarServicioIndividual(@RequestBody MentoriaIndividualDTO servicio) {
        materiaService.agregarServicioIndividual(servicio);
    }

    @DeleteMapping("/individual")
    public void eliminarServicioIndividual(@RequestBody MentoriaIndividualDTO servicio) {
        materiaService.eliminarServicioIndividual(servicio);
    }

    @PostMapping("/grupal")
    public void agregarServicioGrupal(@RequestBody MentoriaGrupalDTO servicio) {
        materiaService.agregarServicioGrupal(servicio);
    }

    @DeleteMapping("/grupal")
    public void eliminarServicioGrupal(@RequestBody MentoriaGrupalDTO servicio) {
        materiaService.eliminarServicioGrupal(servicio);
    }

    @PostMapping("/traduccion")
    public void agregarTraduccion(@RequestBody TraduccionDTO servicio) {
        materiaService.agregarTraduccion(servicio);
    }

    @DeleteMapping("/traduccion")
    public void eliminarTraduccion(@RequestBody TraduccionDTO servicio) {
        materiaService.eliminarTraduccion(servicio);
    }
}


