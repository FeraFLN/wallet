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
import com.ferafln.wallet.model.exception.PlayerNotFoundException;
import com.ferafln.wallet.utils.Util;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

/**
 *
 * @author feraf
 */
public class Game {

    private final Player bank;
    private final List<Player> players = new ArrayList();
    private final String code;
    private int initialValue = 0;
    private boolean startGame = false;
    private LocalDateTime lastUpdate = LocalDateTime.now();
    
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

    public void setStartGame(boolean startGame) {
        this.startGame = startGame;
    }
    

    public void addPlayers(Player player) throws InvalidPlayerException {
        if (players.contains(player)) {
            throw new InvalidPlayerException("Player already exist.");
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
        boolean removed = this.players.removeIf(e->e.getName().equalsIgnoreCase(name));
        if(removed){
            Games.SEND_MSG.sendAllExcept("Player "+name+" has left!", code, name);
            Games.SEND_MSG.disconectNotifier(code, name);
        }
    }
    
    public Player transfer(TransferDTO dTO) throws GameException{
        Player result =  transfer(dTO.getPlayerFrom(),dTO.getPlayerTo(), dTO.getValue());
        players.stream().sorted();
        players.sort(Collections.reverseOrder(Comparator.comparingInt(Player::getBalance)));
        int i =1;        
        for (Player p : players) {
            p.setPosition(i);
            i++;
        }
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
