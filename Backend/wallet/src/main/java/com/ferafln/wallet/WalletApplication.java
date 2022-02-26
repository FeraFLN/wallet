package com.ferafln.wallet;

import com.ferafln.wallet.thread.GameCollectorThread;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class WalletApplication {

    public static void main(String[] args) {
        GameCollectorThread.getInstance().start();
        SpringApplication.run(WalletApplication.class, args);
    }

}
