package com.ferafln.wallet.socket.impl;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import com.ferafln.wallet.dto.PlayerDTO;
import com.ferafln.wallet.model.Games;
import com.ferafln.wallet.model.exception.GameNotFoundException;
import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.logging.Level;
import java.util.logging.Logger;
import com.ferafln.wallet.socket.Notifier;
import java.io.InputStreamReader;
import java.net.Socket;

/**
 *
 * @author feraf
 */ 
public class PlayerNotifier implements Notifier {

    private static final String OUTPUT = "<html><head><title>Example</title></head><body><p>Worked!!!</p></body></html>";
    private static final String OUTPUT_HEADERS = "HTTP/1.1 200 OK\r\n"
            + "Content-Type: text/html\r\n"
            + "Access-Control-Allow-Origin: *\r\n"
            + "Content-Length: ";
    private static final String OUTPUT_END_OF_HEADERS = "\r\n\r\n";
    private String name;
    private String code;
    private boolean loged = false;
    private final PrintWriter writer;
    private final BufferedReader reader;
    private static final Logger LOGGER = Logger.getLogger(NotificatorSocketImpl.class.getName());
    private final Socket socket;

    public PlayerNotifier(Socket socket) throws IOException {
        this.socket = socket;
        this.reader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
        this.writer = new PrintWriter(socket.getOutputStream(), true);
    }

    @Override
    public void login() {
        new Thread(() -> {
            while (!loged) {
                try {
                    PlayerDTO p = null;// parseToPlayer();
                    String json = reader.readLine();
                    if(json!=null){
                        System.out.println(json);
                        this.writer.println(OUTPUT_HEADERS + OUTPUT.length() + OUTPUT_END_OF_HEADERS + json);
                        break;
                    }
                    if (p != null) {
                        Games.getGame(p.getToken());
                        name = p.getName();
                        code = p.getToken();
                        loged = true;
                    }
                } catch (IOException ex) {
                    LOGGER.log(Level.SEVERE, ex.getMessage(), ex);
                } catch (GameNotFoundException e) {
                    this.writer.println("[ERROR] Game not found.");
                }
            }
        }).start();
    }

    @Override
    public boolean isLoged() {
        return loged;
    }

    @Override
    public void sendMessage(String message, String code) {
        if (this.code.equals(code)) {
            this.writer.println(message);
        }
    }

    @Override
    public boolean isMyself(String code, String name) {
        return this.name.equalsIgnoreCase(name) && this.code.equals(code);
    }

    @Override
    public void disconect() {
        try {
            this.socket.shutdownInput();
            this.socket.shutdownOutput();
            this.socket.close();

        } catch (IOException ex) {
            LOGGER.log(Level.SEVERE, null, ex);
        }
    }

    @Override
    public void disconect(String code) {
        if (this.code.equals(code)) {
            this.loged = false;
            disconect();
        }
    }

    private PlayerDTO parseToPlayer() throws IOException {
        String json = reader.readLine();
        Gson g = new Gson();
        try {
            return g.fromJson(json, PlayerDTO.class);
        } catch (JsonSyntaxException ex) {
//            LOGGER.log(Level.SEVERE, ex.getMessage(), ex);
            this.writer.println("[ERROR] Invalid json player");
            throw ex;
        }
    }

}
