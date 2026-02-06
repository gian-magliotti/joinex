package com.joinex.backend.service;

import com.joinex.backend.dto.*;
import com.joinex.backend.exception.ResourceNotFoundException;
import com.joinex.backend.model.Level;
import com.joinex.backend.repository.LevelRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class GameService {
    private final LevelRepository levelRepository;
    private final JdbcTemplate jdbcTemplate;

    @Transactional(readOnly = true)
    public List<LevelSummary> getLevels() {
        return levelRepository.findAll().stream()
                .map(level -> new LevelSummary(level.getId(), level.getTitle()))
                .toList();
    }

    @Transactional(readOnly = true)
    public LevelDetail getLevelById(Long id) {
        return levelRepository.findById(id)
                .map(level -> new LevelDetail(level.getId(), level.getTitle(), level.getDescription()))
                .orElseThrow(() -> new ResourceNotFoundException("Level not found with ID: " + id));
    }

    @Transactional(readOnly = true)
    public ValidationResult validateSolution(Long levelId, String userSql) {
        Level level = levelRepository.findById(levelId)
                .orElseThrow(() -> new ResourceNotFoundException("Level not found"));

        try {
            log.info("Validating SQL for level {}: {}", levelId, userSql);

            List<Map<String, Object>> userResults = jdbcTemplate.queryForList(userSql);
            List<Map<String, Object>> correctResults = jdbcTemplate.queryForList(level.getSolutionQuery());

            boolean isCorrect = userResults.equals(correctResults);
            String message = isCorrect ? "Excellent job! Query is solved" : "The results are not correct, try again";

            return new ValidationResult(isCorrect, message, userResults);

        } catch (org.springframework.dao.DataAccessException e) {
            log.error("SQL Execution error: {}", e.getMessage());
            return new ValidationResult(false, "Syntax Error: " + e.getMostSpecificCause().getMessage(), null);
        }
    }

    public LevelSummary createLevel(CreateLevel dto) {
        Level level = new Level();
        level.setTitle(dto.title());
        level.setDescription(dto.description());
        level.setSolutionQuery(dto.solutionQuery());

        Level savedLevel = levelRepository.save(level);

        return new LevelSummary(
                savedLevel.getId(),
                savedLevel.getTitle()
        );
    }
}