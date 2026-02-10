package com.joinex.api.controller;

import com.joinex.api.dto.LevelDetailDto;
import com.joinex.api.dto.LevelSummaryDto;
import com.joinex.api.dto.ValidationResultDto;
import com.joinex.api.service.GameService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class GameController {

    private final GameService gameService;

    @GetMapping("/levels")
    public List<LevelSummaryDto> getLevels() {
        return gameService.getLevels();
    }

    @GetMapping("/levels/{id}")
    public LevelDetailDto getLevelById(@PathVariable Long id) {
        return gameService.getLevelById(id);
    }

    @PostMapping("/levels/{id}/validate")
    public ResponseEntity<Map<String, String>> validateStep(
            @PathVariable Long id,
            @RequestParam Integer stepId,
            @RequestParam String query
    ) {
        String jobId = gameService.submitValidationJob(id, stepId, query);
        return ResponseEntity.accepted().body(Map.of("jobId", jobId));
    }

    @GetMapping("/jobs/{jobId}")
    public ResponseEntity<String> getJobResult(@PathVariable String jobId) {
        String result = gameService.getJobResult(jobId);
        if (result == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(result);
    }
}