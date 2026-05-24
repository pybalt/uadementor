package com.adoo2.uadementor.model;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import com.adoo2.uadementor.service.CalificacionService;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@DiscriminatorValue("RESENA")
public class LogroResena extends Logro {
    private int minPuntuacionesDadas = 11;

    @Override
    public boolean verificarCriterios(Tutor tutor, Alumno alumno, CalificacionService calificacionService) {
        boolean darTrofeo = false;
        List<Calificacion> listaCalif = calificacionService.buscarCalificacionPorAlumnoYTutor(alumno.getId(), tutor.getId());
        List<Calificacion> CalificacionesUnicas = listaCalif.stream()
            .collect(Collectors.groupingBy(Calificacion::getTutor))
            .values()
            .stream()
            .map(calificaciones -> calificaciones.get(0))
            .collect(Collectors.toList());

        if (alumno.getListaLogros().size() > 1) {
            return darTrofeo;
        }

        if (CalificacionesUnicas.size() >= minPuntuacionesDadas) {
            darTrofeo = true;
        }

        return darTrofeo;
    }

    @Override
    public Logro otorgarLogro(Usuario usuario) {
        LogroResena logro = new LogroResena();
        usuario.getListaLogros().add(logro);
        logro.setUsuario(usuario);
        logro.setfecha(new Date());
        return logro;
    }
}
