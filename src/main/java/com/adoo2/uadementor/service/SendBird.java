package com.adoo2.uadementor.service;

import com.adoo2.uadementor.model.Mensaje;
import org.springframework.stereotype.Service;

@Service
public class SendBird implements IAdapterChat {
    @Override
    public void enviarMensaje(Mensaje mensaje) {
        System.out.println("Enviando mensaje con SendBird: " + mensaje.getMensaje());
    }
}


