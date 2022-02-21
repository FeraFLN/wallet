/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ferafln.wallet.model;

import com.ferafln.wallet.enums.TypeTransactionEnum;
import java.time.LocalTime;

/**
 *
 * @author feraf
 */
public class Detail {
    private TypeTransactionEnum type;
    private int value;
    private String name;
    private final LocalTime time;

    public Detail(TypeTransactionEnum type, int value, String name) {
        this.type = type;
        this.value = value;
        this.name = name;
        this.time = LocalTime.now();
    }

    public TypeTransactionEnum getType() {
        return type;
    }

    public void setType(TypeTransactionEnum type) {
        this.type = type;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
    public LocalTime getTime(){
        return this.time;
    }
    
}
