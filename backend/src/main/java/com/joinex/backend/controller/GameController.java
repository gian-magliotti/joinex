package com.joinex.backend.controller;

import com.joinex.backend.dto.LevelDetailDto;
import com.joinex.backend.dto.LevelSummaryDto;
import com.joinex.backend.dto.ValidationResultDto;
import com.joinex.backend.service.GameService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ValidationResultDto validate(
            @PathVariable Long id,
            @RequestParam Integer stepId,
            @RequestParam String query
    ) {
        return gameService.validateStep(id, stepId, query);
    }
}