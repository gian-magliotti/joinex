package com.joinex.backend.controller;

import com.joinex.backend.dto.GameResponse;
import com.joinex.backend.model.Level;
import com.joinex.backend.repository.LevelRepository;
import com.joinex.backend.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class GameController {

    @Autowired
    private LevelRepository levelRepository;

    @Autowired
    private GameService gameService;

    @GetMapping("/levels")
    public List<Level> getLevels() {
        return levelRepository.findAll();
    }

    @PostMapping("/levels/{id}/validate")
    public GameResponse validate(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String userSql = body.get("sql");
        return gameService.validateLevel(id, userSql);
    }
}