/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ferafln.wallet.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.ferafln.wallet.enums.TypeTransactionEnum;
import com.ferafln.wallet.model.exception.InsuficientFundsException;
import com.ferafln.wallet.model.exception.InvalidValueException;
import com.google.gson.Gson;
import java.beans.Transient;
import java.util.Deque;
import java.util.LinkedList;
import java.util.Objects;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

/**
 *
 * @author feraf
 */
@Data
public class Player {
    @JsonInclude(Include.NON_NULL)
    @Setter(value=AccessLevel.NONE)
    private String name;
    @JsonInclude(Include.NON_NULL)
    private int balance;
    @JsonInclude(Include.NON_NULL)
    private String avata;
    @JsonInclude(Include.NON_NULL)
    private String color;
    @JsonInclude(Include.NON_NULL)
    private boolean ready;
    @JsonInclude(Include.NON_NULL)
    private final Deque<Detail> history =  new LinkedList<>();
    @JsonIgnore
    private final int historySize = 20;
    public Player() {
        
    }

    public Player(String name, int balance) {
        this.name = name;
        this.balance = balance;
    }

  
    @Transient
    public void sendMoney(int value, Player player) throws InsuficientFundsException, InvalidValueException{
        checkValue(value);
        if((this.balance-value)<0){
            throw new InsuficientFundsException("Insuficient Balance!");
        }
        addToHistory(new Detail(TypeTransactionEnum.S, value, player.getName()));
        this.balance -=value;
        player.reciveMoney(value,this.name);
        
    }
    
    void reciveMoney(int value,String playerFrom) throws InvalidValueException{
        checkValue(value);
        this.balance += value;
        addToHistory(new Detail(TypeTransactionEnum.R, value, playerFrom));        
    }
    
    
    private void addToHistory(Detail detail){
        this.history.addFirst(detail);
        if(this.history.size()>historySize){
            this.history.removeLast();
        }
    }
    private void checkValue(int value) throws InvalidValueException{
        if(value <=0){
            throw new InvalidValueException("The value can not be negative.");
        }
    }
    
    @Override
    public int hashCode() {
        int hash = 7;
        hash = 89 * hash + Objects.hashCode(this.name);
        return hash;
    }
    
    public Deque<Detail> getHistory(){
        return this.history;
    }
    
    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Player other = (Player) obj;
        if (!Objects.equals(this.name.toLowerCase().trim(), other.name.toLowerCase().trim())) {
            return false;
        }
        
        return true;
    }
    @Override
    public String toString(){
        return new Gson().toJson(this);
    }    
}
