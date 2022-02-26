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
    
    private static int i = 0;
    private Games games = Games.getInstance();
    
    @GetMapping("/test")
    public ResponseEntity<String> create1()  {
        i++;
        return ResponseEntity.ok("Teste fernando "+i);
    }

    @PostMapping("/create")
    public ResponseEntity<Game> create() throws GameException {
        return ResponseEntity.ok(games.createGame());
    }

    @PatchMapping("/join/{code}")
    public ResponseEntity<Game> join(@PathVariable String code, @RequestBody Player player) throws GameException {
        Game g = games.joinGame(code, player);
        return ResponseEntity.ok(g);
    }
//
    @PatchMapping("/initialbalance/{code}/{value}")
    public ResponseEntity<Game> initialValue(@PathVariable String code, @PathVariable int value) throws GameException {
        Game g = games.setInitialBalance(code, value);
        return ResponseEntity.ok(g);
    }
//
    @PatchMapping("/ready/{code}/{name}")
    public ResponseEntity<Game> ready(@PathVariable String code, @PathVariable String name) throws GameException {
        return ResponseEntity.ok(games.setReady(code, name));
    }
//
    @PatchMapping("/startgame/{code}")
    public ResponseEntity<Game> start(@PathVariable String code) throws GameException {
        return ResponseEntity.ok(games.startGame(code));
    }

    @PatchMapping("/transfer/{code}")
    public ResponseEntity<Game> transfer(@PathVariable String code, @RequestBody TransferDTO transferDTO) throws GameException {
        return ResponseEntity.ok(games.transfer(code,transferDTO));
    }

//    @GetMapping("/player/{code}/{name}")
//    public ResponseEntity<GamePlayerDTO> player(@PathVariable String code, @PathVariable String name) throws GameException {
//        GamePlayerDTO result = new GamePlayerDTO(Games.getGame(code), Games.getGame(code).getPlayer(name));
//        return ResponseEntity.ok(result);
//    }

    @GetMapping("/{code}")
    public ResponseEntity<Game> game(@PathVariable String code) throws GameException {
        return ResponseEntity.ok(games.getGame(code));
    }

    @PutMapping("/quit/{code}/{name}")
    public ResponseEntity<Game> quit(@PathVariable String code, @PathVariable String name) throws GameException {
        return ResponseEntity.ok(games.leaveGame(code,name));
    }

    @DeleteMapping("/endgame/{code}")
    public BodyBuilder endgame(@PathVariable String code) throws GameException {
        games.endGame(code);
        return ResponseEntity.ok();
    }

    
}
