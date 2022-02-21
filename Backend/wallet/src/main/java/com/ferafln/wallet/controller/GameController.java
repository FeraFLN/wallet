/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ferafln.wallet.controller;

import com.ferafln.wallet.dto.GamePlayerDTO;
import com.ferafln.wallet.dto.MessageDTO;
import com.ferafln.wallet.dto.TransferDTO;
import com.ferafln.wallet.model.Game;
import com.ferafln.wallet.model.Games;
import com.ferafln.wallet.model.Player;
import com.ferafln.wallet.model.exception.GameException;
import com.ferafln.wallet.utils.MessageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author feraf
 */
@RestController
@RequestMapping("/game")
@CrossOrigin
public class GameController {

    private static final String CROSS = "http://desktop-ferafln:8080";

    @Autowired
    private SimpMessagingTemplate template;

    @PostMapping("/create")
    @CrossOrigin
    public ResponseEntity<Game> create() throws GameException {
        return ResponseEntity.ok(Games.createGame());
    }

    @PatchMapping("/join/{code}")
    public ResponseEntity<Game> join(@PathVariable String code, @RequestBody Player player) throws GameException {
        Game g = Games.joinGame(code, player);
        sengPublicMessage(code, MessageUtil.joinMessage(g, player.getName()));        
        return ResponseEntity.ok(g);
    }

    @PatchMapping("/initialbalance/{code}/{value}")
    public ResponseEntity<Game> initialValue(@PathVariable String code, @PathVariable int value) throws GameException {
        Game g = Games.setInitialBalance(code, value);
        sengPublicMessage(code, MessageUtil.initialValueMessage(g));                
        return ResponseEntity.ok(Games.setInitialBalance(code, value));
    }

    @PatchMapping("/ready/{code}/{name}")
    public ResponseEntity<Game> ready(@PathVariable String code, @PathVariable String name) throws GameException {
        Games.setReady(code, name);
        Game g = Games.getGame(code);
        sengPublicMessage(code, MessageUtil.readyMessage(g, name));
        return ResponseEntity.ok(g);
    }

    @PatchMapping("/startgame/{code}")
    public ResponseEntity<Game> start(@PathVariable String code) throws GameException {
        Game g = Games.startGame(code);
        sengPublicMessage(code, MessageUtil.startGameMessage(g));
        return ResponseEntity.ok(g);
    }

    @PatchMapping("/transfer/{code}")
    public ResponseEntity<Game> transfer(@PathVariable String code, @RequestBody TransferDTO transferDTO) throws GameException {
        Games.getGame(code).transfer(transferDTO);
        Game g = Games.getGame(code);
        sengPublicMessage(code, MessageUtil.sendMoneyMessage(g, transferDTO.getPlayerFrom(), transferDTO.getValue(), transferDTO.getPlayerTo()));
        return ResponseEntity.ok(g);
    }

    @GetMapping("/player/{code}/{name}")
    public ResponseEntity<GamePlayerDTO> player(@PathVariable String code, @PathVariable String name) throws GameException {
        GamePlayerDTO result = new GamePlayerDTO(Games.getGame(code), Games.getGame(code).getPlayer(name));
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{code}")
    public ResponseEntity<Game> game(@PathVariable String code) throws GameException {
        return ResponseEntity.ok(Games.getGame(code));
    }

    @PutMapping("/quit/{code}/{name}")
    public ResponseEntity quit(@PathVariable String code, @PathVariable String name) throws GameException {
        Games.getGame(code).leave(name);
        sengPublicMessage(code, MessageUtil.quitGameMessage(Games.getGame(code), name));
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/endgame/{code}")
    public BodyBuilder endgame(@PathVariable String code) throws GameException {
        Games.removeGame(code);
        return ResponseEntity.ok();
    }

    private void sengPublicMessage(String code, MessageDTO messageDTO) {
        template.convertAndSendToUser(code, "/chatroom", messageDTO);
    }
}
