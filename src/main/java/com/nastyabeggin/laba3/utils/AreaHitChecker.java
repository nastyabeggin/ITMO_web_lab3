package com.nastyabeggin.laba3.utils;

import com.nastyabeggin.laba3.entity.Shot;

public class AreaHitChecker {
    public static boolean isHit(Shot aShot) {
        return isCircleZone(aShot) || isTriangleZone(aShot) || isRectangleZone(aShot);
    }

    private static boolean isRectangleZone(Shot aShot) {
        double x = aShot.getX();
        double y = aShot.getY();
        double r = aShot.getR();
        return (x >= 0) && (y <= 0) && (x <= r) && (y >= (-1) * r/2);
    }

    private static boolean isCircleZone(Shot aShot) {
        double x = aShot.getX();
        double y = aShot.getY();
        double r = aShot.getR();
        return (x * x + y * y <= r / 2 * r / 2) && (x <= 0) && (y >= 0);
    }

    private static boolean isTriangleZone(Shot aShot) {
        double x = aShot.getX();
        double y = aShot.getY();
        double r = aShot.getR();
        return (x>=0) && (y>=0) && (y <= - 2 * x + r);
    }
}
