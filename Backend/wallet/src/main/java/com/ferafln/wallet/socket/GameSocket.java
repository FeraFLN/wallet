/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ferafln.wallet.socket;

import com.ferafln.wallet.model.exception.GameNotFoundException;

/**
 *
 * @author feraf
 */
public interface GameSocket {
    void listening();
    
    void disconectAll(String gameCode);
    
    void disconectNotifier(String gameCode, String name) throws GameNotFoundException; 
}
