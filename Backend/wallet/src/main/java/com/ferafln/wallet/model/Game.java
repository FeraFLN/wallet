/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ferafln.wallet.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.ferafln.wallet.dto.TransferDTO;
import com.ferafln.wallet.model.exception.GameException;
import com.ferafln.wallet.model.exception.GameNotFoundException;
import com.ferafln.wallet.model.exception.InvalidPlayerException;
import com.ferafln.wallet.model.exception.PlayerNotFoundException;
import com.ferafln.wallet.utils.Util;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

/**
 *
 * @author feraf
 */
public class Game {

    @JsonInclude(Include.NON_NULL)
    private final Player bank;
    @JsonInclude(Include.NON_NULL)
    private final List<Player> players = new ArrayList();
    @JsonInclude(Include.NON_NULL)
    private final String code;
    @JsonInclude(Include.NON_NULL)
    private int initialValue = 0;
    @JsonInclude(Include.NON_NULL)
    private boolean startGame = false;

    
    public Game() {
        this.code = Util.randomString();
        this.bank= new Player("Bank", 50000000);

    }

    public int getInitialValue() {
        return initialValue;
    }

    public void setInitialValue(int initialValue) {
        this.initialValue = initialValue;
    }

    public Player getBank() {
        return bank;
    }   

    public String getCode() {
        return code;
    }

    public boolean isStartGame() {
        return startGame;
    }

    public void setStartGame(boolean startGame) throws GameException {
        if(players.size()<2){
            throw new GameException("The game must have at least two players!");
        }
        this.startGame = startGame;
    }
    

    public void addPlayers(Player player) throws InvalidPlayerException {
        if (players.contains(player)) {
            throw new InvalidPlayerException("Player already exist.");
        }
        if(players.stream().anyMatch(p -> p.getColor().equalsIgnoreCase(player.getColor()))){
            throw new InvalidPlayerException("Color not available.");            
        }
        
        if (players.size() > 6) {
            throw new InvalidPlayerException("Game is full.");
        }
        player.setBalance(initialValue);
        this.players.add(player);
    }
    
    public boolean isReady(){
        return players.stream().allMatch(e->e.isReady());
    }

    public void setInitialBalance(int value){
        this.initialValue= value;
        this.players.stream().forEach(e->e.setBalance(value));
    }
    public Player setReady(String name) throws PlayerNotFoundException{
        Player p = getPlayer(name);
        p.setReady(!p.isReady());
        return p;       
    }
    public List<Player> getPlayers() {
        return new ArrayList(this.players);
    }

    public void leave(String name) throws GameNotFoundException{
       this.players.removeIf(e->e.getName().equalsIgnoreCase(name));
        
    }
    
    public Player transfer(TransferDTO dTO) throws GameException{
        Player result =  transfer(dTO.getPlayerFrom(),dTO.getPlayerTo(), dTO.getValue());
        players.sort(Collections.reverseOrder(Comparator.comparingInt(Player::getBalance)));
        return result;
    }
    public Player transfer(String playerFrom, String playerTo, int amount) throws GameException {
        Player pFrom = getPlayer(playerFrom);
        Player pTo = getPlayer(playerTo);
        pFrom.sendMoney(amount, pTo);
        Games.SEND_MSG.sendTo(playerFrom+" sent $"+amount+".", code, playerTo);
        Games.SEND_MSG.sendTo(playerTo+" recive the money.", code, playerFrom);
        return pFrom;
    }
    
    public Player getPlayer(String name) throws PlayerNotFoundException{        
        return this.bank.getName().equalsIgnoreCase(name)? this.bank: this.players
                .stream()
                .filter(e -> e.getName().equalsIgnoreCase(name))
                .findFirst()
                .orElseThrow(() -> new PlayerNotFoundException("Player '"+name+"' not found."));
    }

}
