/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ferafln.wallet.dto;

import com.ferafln.wallet.model.Game;

/**
 *
 * @author feraf
 */
public class MessageDTO {
    private String senderName;
    private String receiverName;
    private String codeGame;
    private String message;
    private boolean update;
    private Game game;

    public MessageDTO() {
    }

    public String getSenderName() {
        return senderName;
    }

    public String getReceiverName() {
        return receiverName;
    }

    public void setReceiverName(String receiverName) {
        this.receiverName = receiverName;
    }

    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }

    public String getCodeGame() {
        return codeGame;
    }

    public void setCodeGame(String codeGame) {
        this.codeGame = codeGame;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isUpdate() {
        return update;
    }

    public void setUpdate(boolean update) {
        this.update = update;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    
}
