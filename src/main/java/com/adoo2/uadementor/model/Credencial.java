package com.adoo2.uadementor.model;

import com.adoo2.uadementor.service.IAdapterVerificadorCredencial;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Credencial {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id = 1L;

    @Lob
    private byte[] foto;

    @Temporal(TemporalType.DATE)
    private Date fecha;

    private String name;

    @Transient
    private IAdapterVerificadorCredencial adapter;

    public void subir(Tutor tutor) {}

    public boolean verificarCredencial(Credencial credencial) {
        return adapter.verificarCredencial(credencial);
    }
}


