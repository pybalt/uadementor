package com.adoo2.uadementor.rest;

import com.adoo2.uadementor.model.Chat;
import com.adoo2.uadementor.model.Mensaje;
import com.adoo2.uadementor.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chat")
public class ChatController {
    @Autowired
    private ChatService chatService;

    @PostMapping("/enviarMensaje")
    public void enviarMensaje(@RequestBody Mensaje mensaje) {
        chatService.enviarMensaje(mensaje);
    }

    @PostMapping("/crearChat")
    public Chat crearChat(@RequestBody Chat chat) {
        return chatService.crearChat(chat);
    }
}


