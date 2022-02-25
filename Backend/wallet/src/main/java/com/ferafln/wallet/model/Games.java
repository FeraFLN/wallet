/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ferafln.wallet.model;

import com.ferafln.wallet.model.exception.GameException;
import com.ferafln.wallet.model.exception.GameNotFoundException;
import com.ferafln.wallet.model.exception.InvalidPlayerException;
import com.ferafln.wallet.socket.NotificatorSocket;
import com.ferafln.wallet.socket.impl.NotificationBuillder;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

/**
 *
 * @author feraf
 */
public class Games {
    private final static Map<String, Game> GAME = new HashMap<>();
    
    public final static NotificatorSocket SEND_MSG = NotificationBuillder.getInstance();
    
    public static void removeGame(String codeGame ){ 
        GAME.remove(codeGame);
        SEND_MSG.disconectAll(codeGame);
    }
    public static Game createGame(Game game ) throws InvalidPlayerException{
        GAME.put(game.getCode(), game);
        return GAME.get(game.getCode());
    }
    
    public static Game createGame() throws InvalidPlayerException{
        return createGame(new Game());
        
    }
    public static Player setReady(String code,String player) throws  GameException{
       
        return getGame(code).setReady(player);
        
    }
    
    public static Game startGame(String code) throws  GameException{
        Game g = getGame(code);
        if(!g.isReady()){
            throw new GameException("Some players are not ready yet!");
        }            
        g.setStartGame(true);        
        return g;
    }
    
    public static Game setInitialBalance(String code,int value) throws  GameException{
        getGame(code).setInitialBalance(value);
        return getGame(code);
    }
    
    public static Game joinGame(String code,Player player) throws  GameException{
        if(!GAME.containsKey(code)){
            throw new GameNotFoundException();
        }
        if(GAME.get(code).isStartGame()){
            throw new GameException("Game has been started.");
        }
        Game g = GAME.get(code);
        g.addPlayers(player);        
        return g;
    }
    
    public static Game getGame(String code) throws GameNotFoundException{
        return Optional.ofNullable(GAME.get(code)).orElseThrow(()->new GameNotFoundException());
    }
    
}
