/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ferafln.wallet.dto;

import com.ferafln.wallet.model.Game;
import com.ferafln.wallet.model.Player;

/**
 *
 * @author feraf
 */
public class GamePlayerDTO {
    private Game game;
    private Player player;

    public GamePlayerDTO(Game game, Player player) {
        this.game = game;
        this.player = player;
    }

    public GamePlayerDTO() {
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public Player getPlayer() {
        return player;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }
    
    
}
