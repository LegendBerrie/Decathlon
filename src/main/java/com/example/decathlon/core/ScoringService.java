package com.example.decathlon.core;

import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class ScoringService {

    public enum Type { TRACK, FIELD }

    public record EventDef(String id, Type type, double A, double B, double C, String unit){}

    private final Map<String, EventDef> events = Map.of(

            "100m", new EventDef("100m",Type.TRACK,25.4347,18,1.81,"s"),
            "400m", new EventDef("400m",Type.TRACK,1.53775,82,1.81,"s"),
            "1500m", new EventDef("1500m",Type.TRACK,0.03768,480,1.85,"s"),
            "110mH", new EventDef("110mH",Type.TRACK,5.74352,28.5,1.92,"s"),

            "longJump", new EventDef("longJump",Type.FIELD,0.14354,220,1.4,"cm"),
            "highJump", new EventDef("highJump",Type.FIELD,0.8465,75,1.42,"cm"),
            "poleVault", new EventDef("poleVault",Type.FIELD,0.2797,100,1.35,"cm"),

            "shotPut", new EventDef("shotPut",Type.FIELD,51.39,1.5,1.05,"m"),
            "discus", new EventDef("discus",Type.FIELD,12.91,4,1.1,"m"),
            "javelin", new EventDef("javelin",Type.FIELD,10.14,7,1.08,"m")
    );

    public int score(String eventId, double raw){

        EventDef e = events.get(eventId);

        if(e==null) return 0;

        double points;

        if(e.type == Type.TRACK){

            double x = e.B - raw;

            if(x <= 0) return 0;

            points = e.A * Math.pow(x,e.C);

        } else {

            double x = raw - e.B;

            if(x <= 0) return 0;

            points = e.A * Math.pow(x,e.C);

        }

        return (int)Math.floor(points);
    }

}