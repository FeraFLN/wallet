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
public interface Notificator {
    void sendAll(String message, String gameCode);
    
    void sendAllExcept(String message, String gameCode, String excludePlayer);
    
    void sendTo(String message, String codeGame, String toPlayer);
}
