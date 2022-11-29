package com.nastyabeggin.laba3.utils;

import com.nastyabeggin.laba3.entity.Shot;

public class Validator {
    public static boolean isValid(Shot aShot){
        double x = aShot.getX();
        double y = aShot.getY();
        double r = aShot.getR();
        return (x >= -5 && x <= 3 && y >= -5 && y <= 3 && r >= 1 && r <= 5 && r % 0.5 == 0.);
    }
}
