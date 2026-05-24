package com.adoo2.uadementor.service;

import com.adoo2.uadementor.rest.dto.SesionIndividualDTO;
import com.adoo2.uadementor.rest.dto.SesionGrupalDTO;
import com.adoo2.uadementor.rest.dto.TraduccionDTO;
import com.adoo2.uadementor.model.Materia;
import com.adoo2.uadementor.model.TourGrupal;
import com.adoo2.uadementor.model.TourIndividual;
import com.adoo2.uadementor.model.Traduccion;
import org.springframework.stereotype.Service;

@Service
public class MateriaService {
    public void agregarServicioIndividual(SesionIndividualDTO servicioDTO) {
        Materia servicio = new Materia();
        servicio.setDescripcion(servicioDTO.getDescripcion());

        servicio.setZona(servicioDTO.getZona());
        servicio.setTipo(new TourIndividual());
}

    public void eliminarServicioIndividual(SesionIndividualDTO servicioDTO) {}

    public void agregarServicioGrupal(SesionGrupalDTO servicioDTO) {
        Materia servicio = new Materia();
        servicio.setDescripcion(servicioDTO.getDescripcion());

        servicio.setZona(servicioDTO.getZona());
        servicio.setTamMaxGrupo(servicioDTO.getTamMaxGrupo());
        servicio.setTipo(new TourGrupal());
}

    public void eliminarServicioGrupal(SesionGrupalDTO servicioDTO) {}

    public void agregarTraduccion(TraduccionDTO servicioDTO) {
        Materia servicio = new Materia();
        servicio.setDescripcion(servicioDTO.getDescripcion());

        servicio.setZona(servicioDTO.getZona());
        servicio.setIdiomas(servicioDTO.getIdiomas());
        servicio.setTipo(new Traduccion());
}

    public void eliminarTraduccion(TraduccionDTO servicioDTO) {}
}


