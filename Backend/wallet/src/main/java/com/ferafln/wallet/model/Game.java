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
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

/**
 *
 * @author feraf
 */
@Data
public class Game{

    @JsonInclude(Include.NON_NULL)
    private final Player bank;
    @JsonInclude(Include.NON_NULL)
    private final List<Player> players = new ArrayList();
    @JsonInclude(Include.NON_NULL)
    private final String code;
    @JsonInclude(Include.NON_NULL)
    private int initialValue = 0;
    @JsonInclude(Include.NON_NULL)
    @Setter(value=AccessLevel.NONE)
    private boolean startGame = false;

    public Game() {
        this.code = Util.randomString();
        this.bank = new Player("Bank", 50000000);

    }

    public void startGame() throws GameException {
        if (players.size() < 2) {
            throw new GameException("The game must have at least two players!");
        }
        if (!isReady()) {
            throw new GameException("Some players are not ready yet!");
        }
        if (initialValue<1000000) {
            throw new GameException("Initial value must have at least 1000000!");
        }
        startGame = true;
    }

    public void addPlayers(Player player) throws GameException {
        if (players.contains(player)) {
            throw new InvalidPlayerException("Player already exist.");
        }
        if (players.stream().anyMatch(p -> p.getColor().equalsIgnoreCase(player.getColor()))) {
            throw new InvalidPlayerException("Color not available.");
        }

        if (players.size() > 6) {
            throw new InvalidPlayerException("Game is full.");
        }
        if (isStartGame()) {
            throw new GameException("Game has been started.");
        }
        player.setBalance(initialValue);
        this.players.add(player);
    }

    public boolean isReady() {
        return players.stream().allMatch(e -> e.isReady());
    }

    public void setInitialBalance(int value) {
        this.initialValue = value;
        this.players.stream().forEach(e -> e.setBalance(value));
    }

    public Player setReady(String name) throws PlayerNotFoundException {
        Player p = getPlayer(name);
        p.setReady(!p.isReady());
        return p;
    }

    public List<Player> getPlayers() {
        return new ArrayList(this.players);
    }

    public boolean leave(String name){
        return this.players.removeIf(e -> e.getName().equalsIgnoreCase(name));

    }

    public Player transfer(TransferDTO dTO) throws GameException {
        Player result = transfer(dTO.getPlayerFrom(), dTO.getPlayerTo(), dTO.getValue());
        players.sort(Collections.reverseOrder(Comparator.comparingInt(Player::getBalance)));
        return result;
    }

    public Player transfer(String playerFrom, String playerTo, int amount) throws GameException {
        Player pFrom = getPlayer(playerFrom);
        pFrom.sendMoney(amount, getPlayer(playerTo));
        return pFrom;
    }

    public Player getPlayer(String name) throws PlayerNotFoundException {
        return this.bank.getName().equalsIgnoreCase(name) ? this.bank : this.players
                .stream()
                .filter(e -> e.getName().equalsIgnoreCase(name))
                .findFirst()
                .orElseThrow(() -> new PlayerNotFoundException("Player '" + name + "' not found."));
    }

}
