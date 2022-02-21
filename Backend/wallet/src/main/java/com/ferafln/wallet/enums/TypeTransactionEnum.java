/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ferafln.wallet.enums;

/**
 *
 * @author feraf
 */
public enum TypeTransactionEnum {
    R("Recive"),
    S("Send");
    
    private String description;

    private TypeTransactionEnum(String description) {
        this.description = description;
    }
    
    
    
}
