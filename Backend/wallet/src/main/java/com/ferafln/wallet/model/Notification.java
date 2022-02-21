/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ferafln.wallet.model;

/**
 *
 * @author feraf
 */
public class Notification {
    private String message;
    private String reciverMessage;
    private boolean online = false;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getReciverMessage() {
        return reciverMessage;
    }

    public void setReciverMessage(String reciverMessage) {
        this.reciverMessage = reciverMessage;
    }

    public boolean isOnline() {
        return online;
    }

    public void setOnline(boolean online) {
        this.online = online;
    }
    
    
    
    
}
