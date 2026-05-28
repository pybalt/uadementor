package com.adoo2.uadementor.service;

import com.adoo2.uadementor.rest.dto.MentoriaIndividualDTO;
import com.adoo2.uadementor.rest.dto.MentoriaGrupalDTO;
import com.adoo2.uadementor.rest.dto.TraduccionDTO;
import com.adoo2.uadementor.model.Materia;
import com.adoo2.uadementor.model.MentoriaGrupal;
import com.adoo2.uadementor.model.MentoriaIndividual;
import com.adoo2.uadementor.model.Traduccion;
import org.springframework.stereotype.Service;

@Service
public class MateriaService {
    public void agregarServicioIndividual(MentoriaIndividualDTO servicioDTO) {
        Materia servicio = new Materia();
        servicio.setDescripcion(servicioDTO.getDescripcion());

        servicio.setZona(servicioDTO.getZona());
        servicio.setTipo(new MentoriaIndividual());
}

    public void eliminarServicioIndividual(MentoriaIndividualDTO servicioDTO) {}

    public void agregarServicioGrupal(MentoriaGrupalDTO servicioDTO) {
        Materia servicio = new Materia();
        servicio.setDescripcion(servicioDTO.getDescripcion());

        servicio.setZona(servicioDTO.getZona());
        servicio.setTamMaxGrupo(servicioDTO.getTamMaxGrupo());
        servicio.setTipo(new MentoriaGrupal());
}

    public void eliminarServicioGrupal(MentoriaGrupalDTO servicioDTO) {}

    public void agregarTraduccion(TraduccionDTO servicioDTO) {
        Materia servicio = new Materia();
        servicio.setDescripcion(servicioDTO.getDescripcion());

        servicio.setZona(servicioDTO.getZona());
        servicio.setIdiomas(servicioDTO.getIdiomas());
        servicio.setTipo(new Traduccion());
}

    public void eliminarTraduccion(TraduccionDTO servicioDTO) {}
}


