/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ferafln.wallet.socket;

/**
 *
 * @author feraf
 */
public interface Notifier {
    
    void login();
    
    boolean isLoged();
    
    void sendMessage(String message,String code);
    
    boolean isMyself(String code, String name);
    
    void disconect(String code);
    
    void disconect();
    
}
