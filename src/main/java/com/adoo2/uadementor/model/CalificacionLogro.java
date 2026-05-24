package com.adoo2.uadementor.model;
import java.util.ArrayList;
import java.util.List;
public class CalificacionLogro {
    public List<Logro> listaLogro = new ArrayList<>();
    public Calificacion calificacion;

    public void setLogro(Logro logro){
        this.listaLogro.add(logro);
    }
    public void setCalificacion(Calificacion calificacion){
        this.calificacion = calificacion;
    }

    public List<Logro> getLogro(){
        return this.listaLogro;
    }
    public Calificacion getCalificacion(){
        return this.calificacion;
    }
    public boolean isLogroNull(Logro logro){
        return logro==null;
    }
}


