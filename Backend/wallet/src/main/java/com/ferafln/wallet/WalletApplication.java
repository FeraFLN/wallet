package com.ferafln.wallet;

import com.ferafln.wallet.socket.impl.NotificationBuillder;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class WalletApplication {

    public static void main(String[] args) {
//        NotificationBuillder.startSocket();
        SpringApplication.run(WalletApplication.class, args);
    }

}
