/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ferafln.wallet.controller;

import com.ferafln.wallet.dto.MessageDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author feraf
 */
@RestController
public class WebSocketTextController {

//    @Autowired
//    private SimpMessagingTemplate template;
//
//    @MessageMapping("/message")
//    public MessageDTO broadcastMessage(@Payload MessageDTO message) {
//        template.convertAndSendToUser(message.getCodeGame(), "/chatroom", message);        
//        return message;
//    }
//
//    @MessageMapping("/private-message")
//    public MessageDTO sendMessage(@Payload MessageDTO message) {
//        template.convertAndSendToUser(message.getSenderName(), "/private", message);
//        return message;
//    }
}

