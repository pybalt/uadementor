package com.adoo2.uadementor.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.adoo2.uadementor.service.CalificacionService;
import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Calificacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "tutor_id", nullable = false)
    @JsonBackReference
    private Tutor tutor;

    @ManyToOne
    @JoinColumn(name = "alumno_id", nullable = false)
    private Alumno alumno;

    private int puntaje;
    private String comentario;
    private Date fecha;
    @Transient
    private static List<Logro> interesados = new ArrayList<>();

    public static CalificacionLogro generarCalificacion(Tutor tutor, Alumno alumno, int puntaje, String comentario, CalificacionService calificacionService) {
        System.out.println("llegue a calificacion");
        Calificacion calificacion = new Calificacion();
        calificacion.tutor = tutor;
        calificacion.alumno = alumno;
        calificacion.fecha = (new Date());
        calificacion.puntaje = puntaje;
        calificacion.comentario = comentario;

        CalificacionLogro ct = new CalificacionLogro();
        ct.setLogro(null);
        for (Logro observador : interesados) {
            if (observador.verificarCriterios(tutor, alumno, calificacionService)) {
                Logro otorgado = observador.otorgarLogro(tutor);
                ct.setLogro(otorgado);
            }
        }
        ct.setCalificacion(calificacion);
        return ct;
    }

    public static void agregarObservador(Logro observador) {
        interesados.add(observador);
    }

    public static List<Logro> devolverObservadores() {
        for (Object interesados : interesados) {
            System.out.print(interesados);
        }
        return interesados;
    }

    public void eliminarObservador(Logro observador) {
        this.interesados.remove(observador);
    }
    public int getPuntaje(){
        return puntaje;
    }
    public void setTutor(Tutor tutor){
        this.tutor = tutor;
    }
    public Long getTutor(){
        return id;
    }
}


