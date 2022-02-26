/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ferafln.wallet.model;

import com.ferafln.wallet.dto.TransferDTO;
import com.ferafln.wallet.model.exception.GameException;
import com.ferafln.wallet.model.exception.GameNotFoundException;
import com.ferafln.wallet.model.exception.InvalidPlayerException;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import lombok.Getter;
import lombok.Setter;
import com.ferafln.wallet.model.exception.PlayerNotFoundException;

/**
 *
 * @author feraf
 */
public class Games{
    private final static Map<String, ExpirableGame> GAME = new HashMap<>();
    private static Games games = null;
    
    private Games(){}
    
    public static Games getInstance(){
        if(games==null){
            games = new Games();
        }
        return games;
    }
    public void endGame(String codeGame ) throws GameNotFoundException{ 
        getGame(codeGame);
        GAME.remove(codeGame);
    }
    
  
    public Game createGame() throws InvalidPlayerException{
        ExpirableGame eg = new ExpirableGame(new Game());
        GAME.put(eg.getGame().getCode(), eg);
        return eg.getGame();
        
    }

    public Game setReady(String code,String player) throws  GameException{       
        Game g = getGame(code);
        g.setReady(player);
        return g;        
    }
    
    public Game startGame(String code) throws  GameException{
        Game g = getGame(code);                 
        g.startGame();        
        return g;
    }
    
    public Game setInitialBalance(String code,int value) throws  GameException{
        getGame(code).setInitialBalance(value);        
        return getGame(code);
    }
    
    public Game joinGame(String code,Player player) throws  GameException{
        Game g = getGame(code);
        g.addPlayers(player);        
        return g;
    }
    
    public Game transfer(String code, TransferDTO transferDTO) throws GameException{
        Game g = getGame(code);
        g.transfer(transferDTO);
        return g;        
    }
    
    public Game leaveGame (String code,String name) throws GameNotFoundException, PlayerNotFoundException{
        Game g = getGame(code);
        if(!g.leave(name)){
            throw new PlayerNotFoundException("Player not found!");
        }
        return g;
    }
    
    public Game getGame(String code) throws GameNotFoundException{
        ExpirableGame eg = Optional.ofNullable(GAME.get(code)).orElseThrow(()->new GameNotFoundException());
        eg.setLastUpdate();
        return eg.game;
    }
    
    public void clean(int timeExpire , int timeExpireGame){
        if(GAME.isEmpty()){
            return;
        }
        LocalDateTime now = LocalDateTime.now();
        GAME.values().removeIf(e ->e.expired(now,timeExpire,timeExpireGame));
    }
    
    private class ExpirableGame{
        @Getter
        @Setter
        private Game game;
        @Getter
        private final LocalDateTime startTime = LocalDateTime.now();
        @Getter
        private LocalDateTime lastUpdate = LocalDateTime.now();

        public ExpirableGame(Game game) {
            this.game = game;
        }
        
        public void setLastUpdate(){
            this.lastUpdate = LocalDateTime.now();
        }           
        public boolean expired(LocalDateTime timeNow, int timeExpire,int timeExpireGame){
            long minExpireGame = ChronoUnit.MINUTES.between(startTime, timeNow);
            long minExpire = ChronoUnit.MINUTES.between(lastUpdate, timeNow);
            return minExpireGame >= timeExpireGame || minExpire >= timeExpire;
        }
    }
}
