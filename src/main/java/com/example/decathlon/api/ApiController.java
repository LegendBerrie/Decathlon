package com.example.decathlon.api;

import com.example.decathlon.core.CompetitionService;
import com.example.decathlon.dto.ScoreReq;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ApiController {

    private final CompetitionService comp;

    public ApiController(CompetitionService comp) {
        this.comp = comp;
    }

    @PostMapping("/competitors")
    public ResponseEntity<?> add(@RequestBody Map<String, String> body) {
        String name = Optional.ofNullable(body.get("name")).orElse("").trim();

        if (name.isEmpty()) {
            return ResponseEntity.badRequest().body("You must fill in all required fields.");
        }

        if (name.length() > 50) {
            return ResponseEntity.badRequest().body("Competitor name must be 50 characters or fewer.");
        }

        if (!name.matches("[\\p{L} ]+")) {
            return ResponseEntity.badRequest().body("Competitor name may only contain letters and spaces.");
        }

        comp.addCompetitor(name);
        return ResponseEntity.status(201).build();
    }

    @PostMapping("/score")
    public ResponseEntity<?> score(@RequestBody ScoreReq r) {
        if (r.name() == null || r.name().isBlank() || r.event() == null || r.event().isBlank()) {
            return ResponseEntity.badRequest().body("You must fill in all required fields.");
        }

        if (!comp.hasCompetitor(r.name().trim())) {
            return ResponseEntity.badRequest().body("Competitor must be added first.");
        }

        int pts = comp.score(r.name().trim(), r.event(), r.raw());
        return ResponseEntity.ok(Map.of("points", pts));
    }

    @GetMapping("/standings")
    public List<Map<String, Object>> standings() {
        return comp.standings();
    }

    @GetMapping(value = "/export.csv", produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<String> export() {
        String csv = comp.exportCsv();
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd_HH-mm-ss"));

        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=results_" + timestamp + ".csv")
                .body(csv);
    }
}