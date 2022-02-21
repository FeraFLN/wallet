package com.ferafln.wallet.socket.impl;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import com.ferafln.wallet.socket.NotificatorSocket;

/**
 *
 * @author feraf
 */
public class NotificationBuillder {
    private static NotificatorSocket notificationSocket;
    private static Thread thread = null ;
    
    
    public static void startSocket() {
        if(thread == null){
            thread = new  Thread(new SocketRun(getInstance()));
        }
        thread.start();
    }
    public static NotificatorSocket getInstance() {
        if (notificationSocket == null) {
            notificationSocket = new NotificatorSocketImpl();
        }
        return notificationSocket;
    }
}
