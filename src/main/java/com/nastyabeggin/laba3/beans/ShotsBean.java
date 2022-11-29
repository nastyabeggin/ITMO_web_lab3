package com.nastyabeggin.laba3.beans;

import com.nastyabeggin.laba3.utils.AreaHitChecker;
import com.nastyabeggin.laba3.utils.Validator;
import com.nastyabeggin.laba3.entity.Shot;
import jakarta.enterprise.context.RequestScoped;


import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import javax.faces.bean.ManagedBean;
import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;
import javax.servlet.http.HttpServletResponse;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

public class ShotsBean implements Serializable {
    private Shot shot;
    private List<Shot> shotsList;
    private int timezone;
    private static Map<String, Integer> rValues;

    @PostConstruct

    public void postConstruct() {
        shot = new Shot();
        shotsList = new LinkedList<>();
    }

    static {
        rValues = new LinkedHashMap<String, Integer>();
        rValues.put("1", 1);
        rValues.put("2", 2);
        rValues.put("3", 3);
        rValues.put("4", 4);
        rValues.put("5", 5);
    }


    public Object getrValues() {
        return rValues;
    }

    public void add() {
        LocalDateTime startTime = LocalDateTime.now(ZoneOffset.UTC);
        if (Validator.isValid(shot)) {
            shot.setStatus(AreaHitChecker.isHit(shot));
            shot.setCurrentTime(startTime.minusMinutes(getTimezone()).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
            shot.setScriptTime(Math.round(LocalDateTime.now().minusNanos(startTime.getNano()).getNano() * 0.001));
            shotsList.add(shot);
            shot = new Shot();
        } else {
            ExternalContext context = FacesContext.getCurrentInstance().getExternalContext();
            HttpServletResponse response = (HttpServletResponse) context.getResponse();
            response.setStatus(500);
        }
    }

    public void addThroughPlot(){
        String string_x = FacesContext.getCurrentInstance().getExternalContext().getRequestParameterMap().get("x");
        String string_y = FacesContext.getCurrentInstance().getExternalContext().getRequestParameterMap().get("y");
        String string_r = FacesContext.getCurrentInstance().getExternalContext().getRequestParameterMap().get("r");
        shot.setX(Double.parseDouble(string_x));
        shot.setY(Double.parseDouble(string_y));
        shot.setR(Double.parseDouble(string_r));
        add();
    }

    public void clear(){
        shotsList.clear();
    }

    public void setTimezone() {
        timezone = Integer.parseInt(FacesContext.getCurrentInstance().getExternalContext().getRequestParameterMap().get("timezone"));
    }

    private int getTimezone() {
        return timezone;
    }

    public Shot getShot() {
        return shot;
    }

    public void setShotsList(LinkedList<Shot> shotsList) {
        this.shotsList = shotsList;
    }

    public List<Shot> getShotsList() {
        return shotsList;
    }

}
