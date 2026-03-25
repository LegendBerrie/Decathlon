package com.example.decathlon.core;

import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
public class CompetitionService {
    private final ScoringService scoring;

    public CompetitionService(ScoringService scoring) {
        this.scoring = scoring;
    }

    public static class Competitor {
        public final String name;
        public final Map<String, Integer> points = new ConcurrentHashMap<>();

        public Competitor(String name) {
            this.name = name;
        }

        public int total() {
            return points.values().stream().mapToInt(i -> i).sum();
        }
    }

    private final Map<String, Competitor> competitors = new LinkedHashMap<>();

    public synchronized void addCompetitor(String name) {
        if (!competitors.containsKey(name)) {
            competitors.put(name, new Competitor(name));
        }
    }

    public synchronized boolean hasCompetitor(String name) {
        return competitors.containsKey(name);
    }

    public synchronized int score(String name, String eventId, double raw) {
        Competitor c = competitors.get(name);
        if (c == null) {
            throw new IllegalArgumentException("Competitor must be added first.");
        }
        int pts = scoring.score(eventId, raw);
        c.points.put(eventId, pts);
        return pts;
    }

    public synchronized List<Map<String, Object>> standings() {
        return competitors.values().stream()
                .map(c -> {
                    Map<String, Object> m = new LinkedHashMap<>();
                    m.put("name", c.name);
                    m.put("scores", new LinkedHashMap<>(c.points));
                    m.put("total", c.total());
                    return m;
                })
                .sorted(Comparator.comparingInt(m -> -((Integer) m.get("total"))))
                .collect(Collectors.toList());
    }

    public synchronized String exportCsv() {
        List<String> eventIds = List.of(
                "deca100m",
                "deca110mHurdles",
                "deca400m",
                "deca1500m",
                "decaDiscus",
                "decaHighJump",
                "decaJavelin",
                "decaLongJump",
                "decaPoleVault",
                "decaShotPut",
                "hep100mHurdles",
                "hep200m",
                "hep800m",
                "hepHighJump",
                "hepJavelin",
                "hepLongJump",
                "hepShotPut"
        );

        List<String> header = new ArrayList<>();
        header.add("Name");
        header.addAll(eventIds);
        header.add("Total");

        StringBuilder sb = new StringBuilder();
        sb.append(String.join(",", header)).append("\n");

        for (Competitor c : competitors.values()) {
            List<String> row = new ArrayList<>();
            row.add(c.name);
            int sum = 0;
            for (String ev : eventIds) {
                Integer p = c.points.get(ev);
                row.add(p == null ? "" : String.valueOf(p));
                if (p != null) {
                    sum += p;
                }
            }
            row.add(String.valueOf(sum));
            sb.append(String.join(",", row)).append("\n");
        }

        return sb.toString();
    }
}