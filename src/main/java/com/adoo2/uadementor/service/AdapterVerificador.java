package com.adoo2.uadementor.service;

import com.adoo2.uadementor.model.Credencial;
import org.springframework.stereotype.Service;

@Service
public class AdapterVerificador implements IAdapterVerificadorCredencial {
    @Override
    public boolean verificarCredencial(Credencial credencial) {
        return true;
    }
}


