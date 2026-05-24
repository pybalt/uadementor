package com.adoo2.uadementor.model;
import java.util.Date;
import java.util.List;

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
@DiscriminatorValue("EXITO")
public class LogroExito extends Logro {
    private double calificacion = 4.5;
    private int minimoCalificaciones = 10;

    @Override
    public boolean verificarCriterios(Tutor tutor, Alumno alumno, CalificacionService calificacionService) {
        System.out.println("---------------------------------------------------------------");
        System.out.println("llegue a trofeo exito");
        List<Calificacion> listaCalif = calificacionService.buscarCalificacionPorTutor(tutor.getId()) ;
        int cant = listaCalif.size();
        System.out.println(cant);
        System.out.println(cant >= minimoCalificaciones);

        boolean darTrofeo = false;

        if (tutor.getListaLogros().size() > 1) {
            return darTrofeo;
        }

        for (Calificacion calif : listaCalif) {
            if (calif.getPuntaje() >= calificacion && cant >= minimoCalificaciones) {
                darTrofeo = true;
            }
        }
        System.out.println(darTrofeo);
        return darTrofeo;
    }

    @Override
    public Logro otorgarLogro(Usuario usuario) {
        System.out.println("---------------------------------------------------------------");
        System.out.println("llegue a otorgar trofeo exito");
        LogroExito logro = new LogroExito();
        usuario.getListaLogros().add(logro);
        logro.setUsuario(usuario);
        logro.setfecha(new Date());
        return logro;
    }
}


