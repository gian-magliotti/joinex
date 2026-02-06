package com.joinex.backend.controller;

import com.joinex.backend.dto.CreateLevel;
import com.joinex.backend.dto.LevelDetail;
import com.joinex.backend.dto.LevelSummary;
import com.joinex.backend.dto.ValidationResult;
import com.joinex.backend.model.Level;
import com.joinex.backend.repository.LevelRepository;
import com.joinex.backend.service.GameService;
import lombok.RequiredArgsConstructor;
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
    public List<LevelSummary> getLevels() {
        return gameService.getLevels();
    }

    @GetMapping("/levels/{id}")
    public LevelDetail getLevelById(@PathVariable Long id) {
        return gameService.getLevelById(Long.valueOf(id));
    }

    @PostMapping("/levels/{id}/validate")
    public ValidationResult validate(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String userSql = body.get("sql");
        return gameService.validateSolution(id, userSql);
    }

    @PostMapping("/levels")
    public LevelSummary createLevel(@RequestBody CreateLevel createLevel) {
        return gameService.createLevel(createLevel);
    }
}