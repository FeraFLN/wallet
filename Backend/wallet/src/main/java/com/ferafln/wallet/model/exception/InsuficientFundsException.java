/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ferafln.wallet.model.exception;

/**
 *
 * @author feraf
 */
public class InsuficientFundsException extends GameException {

    public InsuficientFundsException() {
    }

    public InsuficientFundsException(String message) {
        super(message);
    }
    
}
