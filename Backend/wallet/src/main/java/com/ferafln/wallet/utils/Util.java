/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ferafln.wallet.utils;

import org.apache.commons.lang3.RandomStringUtils;

/**
 *
 * @author feraf
 */
public class Util {
    public static String randomString() {
        int length = 5;
        boolean useLetters = true;
        boolean useNumbers = true;
        return RandomStringUtils.random(length, useLetters, useNumbers).toUpperCase();
    }
}
