/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ferafln.wallet.model;

import com.ferafln.wallet.enums.TypeTransactionEnum;
import com.ferafln.wallet.model.exception.InsuficientFundsException;
import com.ferafln.wallet.model.exception.InvalidValueException;
import com.google.gson.Gson;
import java.beans.Transient;
import java.util.Deque;
import java.util.LinkedList;
import java.util.Objects;

/**
 *
 * @author feraf
 */

public class Player {
    
    private String name;
    private int position;
    private int balance;
    private String avata;
    private String color;
    private boolean ready;
    private final Deque<Detail> history = new LinkedList<>();
    
    public Player() {
        
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }

    
    public Player(String name, int balance) {
        this.name = name;
        this.balance = balance;
    }

  
    public String getAvata() {
        return avata;
    }

    public void setAvata(String avata) {
        this.avata = avata;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public boolean isReady() {
        return ready;
    }

    public void setReady(boolean ready) {
        this.ready = ready;
    }
   
    
    public String getName(){
        return this.name;
    }

    public void setBalance(int balance) {
        this.balance = balance;
    }
    
    @Transient
    public void sendMoney(int value, Player player) throws InsuficientFundsException, InvalidValueException{
        checkValue(value);
        if((this.balance-value)<0){
            throw new InsuficientFundsException("Insuficient Balance!");
        }
        this.history.addFirst(new Detail(TypeTransactionEnum.S, value, player.getName()));
        this.balance -=value;
        player.reciveMoney(value,this.name);
        
    }
    
    void reciveMoney(int value,String playerFrom) throws InvalidValueException{
        checkValue(value);
        this.balance += value;
        this.history.addFirst(new Detail(TypeTransactionEnum.R, value, playerFrom));        
    }
    
    public int getBalance(){
        return balance;
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
        if (!Objects.equals(this.name.toLowerCase(), other.name.toLowerCase())) {
            return false;
        }
        return true;
    }
    public String toString(){
        return new Gson().toJson(this);
    }    
}
