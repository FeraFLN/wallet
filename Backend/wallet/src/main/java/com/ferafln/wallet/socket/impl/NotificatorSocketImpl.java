package com.ferafln.wallet.socket.impl;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import com.ferafln.wallet.model.exception.GameNotFoundException;
import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import com.ferafln.wallet.socket.NotificatorSocket;
import com.ferafln.wallet.socket.Notifier;
/**
 *
 * @author feraf
 */
public class NotificatorSocketImpl implements NotificatorSocket {

    private static final Logger LOGGER = Logger.getLogger(NotificatorSocketImpl.class.getName());

    private final List<Notifier> notifiers;
    
    private final int port = 8989;

    public NotificatorSocketImpl() {
        this.notifiers = new ArrayList<>();
    }

//            LOGGER.log(Level.INFO, "Chat Server is listening on port {0}", port);
//                LOGGER.info("New user connected");
    @Override
    public void listening() {
        try ( ServerSocket serverSocket = new ServerSocket(port)) {
            while (true) {
                Socket socket = serverSocket.accept();
                connectingPlayer(socket);
            }
        } catch (IOException ex) {
            LOGGER.log(Level.SEVERE, "Error in the server: " + ex.getMessage(), ex);
        }finally{
             notifiers.forEach(n->n.disconect());
        }
    }

    private void connectingPlayer(Socket socket) throws IOException {
        Notifier newNotifier = new PlayerNotifier(socket);
        newNotifier.login();
        this.notifiers.add(newNotifier);
    }

    @Override
    public void disconectAll(String gameCode) {
        notifiers.forEach(n->n.disconect(gameCode));
        notifiers.removeIf(n->!n.isLoged());
    }

    @Override
    public void disconectNotifier(String gameCode, String name) throws GameNotFoundException {
        notifiers.forEach(n->{
            if(n.isMyself(gameCode,name))
                n.disconect(gameCode);
        });
        notifiers.removeIf(n->n.isMyself(gameCode, name));
    }
    
    @Override
    public void sendAllExcept(String message, String code, String playerName) {
        notifiers.forEach(e->{
            if(!e.isMyself(code,playerName))
                e.sendMessage(message, code);            
        });        
        
    }
    @Override
    public void sendAll(String message, String code) {
        notifiers.forEach(e->e.sendMessage(message, code));        
    }

    @Override
    public void sendTo(String message, String code, String toPlayer) {
        notifiers.forEach(e->{
            if(e.isMyself(code,toPlayer))
                e.sendMessage(message, code);            
        }); 
    }
   
}
