package com.ferafln.wallet.socket.impl;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import com.ferafln.wallet.model.exception.GameNotFoundException;
import com.ferafln.wallet.socket.GameSocket;
/**
 *
 * @author feraf
 */
class SocketRun implements Runnable {

    private final GameSocket notificationSocket;
   
    public SocketRun(GameSocket notificationSocket) {
        this.notificationSocket = notificationSocket;
    }

    @Override
    public void run() {
        notificationSocket.listening();
    }
    public void disconectAll(String gameCode){
        this.notificationSocket.disconectAll(gameCode);
    }
    public void disconectNotifier(String gameCode,String name) throws GameNotFoundException{
        this.notificationSocket.disconectNotifier(gameCode,name);
    }
}
