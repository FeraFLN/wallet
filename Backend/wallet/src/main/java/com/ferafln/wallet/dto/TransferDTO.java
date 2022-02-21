/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ferafln.wallet.dto;

/**
 *
 * @author feraf
 */
public class TransferDTO {
//    private String codeGame;
    private String playerFrom;
    private String playerTo;
    private int value;

//    public String getCodeGame() {
//        return codeGame;
//    }
//
//    public void setCodeGame(String codeGame) {
//        this.codeGame = codeGame;
//    }

    public String getPlayerFrom() {
        return playerFrom;
    }

    public void setPlayerFrom(String playerFrom) {
        this.playerFrom = playerFrom;
    }

    public String getPlayerTo() {
        return playerTo;
    }

    public void setPlayerTo(String playerTo) {
        this.playerTo = playerTo;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }
    
}
