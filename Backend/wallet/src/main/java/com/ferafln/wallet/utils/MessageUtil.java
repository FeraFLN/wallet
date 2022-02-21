/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ferafln.wallet.utils;

import com.ferafln.wallet.dto.MessageDTO;
import com.ferafln.wallet.model.Game;
import java.text.DecimalFormat;

/**
 *
 * @author feraf
 */
public class MessageUtil {
    
    private static final DecimalFormat FORMATTER = new DecimalFormat("$#,###");
    
    public static MessageDTO sendMoneyMessage(Game game,String sender, int value, String receiver){
        MessageDTO msg = new MessageDTO();
        msg.setGame(game);
        msg.setMessage(sender+" enviou "+FORMATTER.format(value)+ " para "+receiver);
        msg.setSenderName(sender);
        msg.setUpdate(true);
        msg.setCodeGame(game.getCode());
        return msg;               
    }
    public static MessageDTO quitGameMessage(Game game,String playerName){
        MessageDTO msg = new MessageDTO();
        msg.setGame(game);
        msg.setMessage(playerName+" saiu da partida!");
        msg.setSenderName(playerName);
        msg.setUpdate(true);
        msg.setCodeGame(game.getCode());
        return msg;               
    }
    public static MessageDTO startGameMessage(Game game){
        MessageDTO msg = new MessageDTO();
        msg.setGame(game);
        msg.setMessage("A partida iniciará em instântes!");
        msg.setSenderName("Bank");
        msg.setUpdate(true);
        msg.setCodeGame(game.getCode());
        return msg;               
    }
    public static MessageDTO readyMessage(Game game, String playerName){
        MessageDTO msg = new MessageDTO();
        msg.setGame(game);
        msg.setMessage("");
        msg.setSenderName(playerName);
        msg.setUpdate(true);
        msg.setCodeGame(game.getCode());
        return msg;               
    }
    public static MessageDTO initialValueMessage(Game game){
        MessageDTO msg = new MessageDTO();
        msg.setGame(game);
        msg.setMessage("O banco alterou o valor inicial para "+FORMATTER.format(game.getInitialValue()));
        msg.setSenderName("Bank");
        msg.setUpdate(true);
        msg.setCodeGame(game.getCode());
        return msg;               
    }
    
    public static MessageDTO joinMessage(Game game, String player){
        MessageDTO msg = new MessageDTO();
        msg.setGame(game);
        msg.setMessage(player+" conectou!");
        msg.setSenderName(player);
        msg.setUpdate(true);
        msg.setCodeGame(game.getCode());
        return msg;
    }
}
