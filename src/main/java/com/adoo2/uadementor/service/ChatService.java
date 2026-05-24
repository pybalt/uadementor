package com.adoo2.uadementor.service;

import com.adoo2.uadementor.model.Chat;
import com.adoo2.uadementor.model.Mensaje;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatService {
    @Autowired
    private IAdapterChat adapterChat;

    public void enviarMensaje(Mensaje mensaje) {
        adapterChat.enviarMensaje(mensaje);
    }

    public Chat crearChat(Chat chat) {
        return chat;
    }
}


