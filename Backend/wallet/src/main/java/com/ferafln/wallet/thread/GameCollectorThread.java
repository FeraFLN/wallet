/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ferafln.wallet.thread;

import com.ferafln.wallet.model.Games;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author fernando.limeira
 */
public class GameCollectorThread {

    private final Games games = Games.getInstance();
    private static GameCollectorThread collectorThread;
    private boolean running = false;

    private GameCollectorThread() {
    }

    public static GameCollectorThread getInstance() {
        if (collectorThread == null) {
            collectorThread = new GameCollectorThread();
        }
        return collectorThread;
    }

    public void start() {
        if (running) {
            throw new RuntimeException("Thread is running!");
        }
        new Thread(() -> {
            try {
                while (true) {
                    running = true;
                    try {
                        Thread.sleep(300000);
                        games.clean(30, 360);
                    } catch (InterruptedException ex) {
                        Logger.getLogger(GameCollectorThread.class.getName()).log(Level.SEVERE, null, ex);
                    }

                }
            } finally {
                running = false;
            }
        }).start();

    }

}
