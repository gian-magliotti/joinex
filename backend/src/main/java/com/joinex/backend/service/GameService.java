package com.joinex.backend.service;

import com.joinex.backend.dto.*;
import com.joinex.backend.exception.ResourceNotFoundException;
import com.joinex.backend.model.Level;
import com.joinex.backend.model.LevelDefinition;
import com.joinex.backend.repository.LevelRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class GameService {

    private final LevelRepository levelRepository;
    private final JdbcTemplate jdbcTemplate;

    /**
     * Obtiene el catálogo de niveles (Resumido).
     */
    @Transactional(readOnly = true)
    public List<LevelSummaryDto> getLevels() {
        return levelRepository.findAll().stream()
                .map(level -> new LevelSummaryDto(
                        level.getId(),
                        level.getTitle(),
                        level.getDifficulty().name()
                ))
                .toList();
    }

    /**
     * Obtiene el detalle completo de un nivel, incluyendo los pasos (Steps).
     * Mapea el contenido del JSON interno a DTOs para el Frontend.
     */
    @Transactional(readOnly = true)
    public LevelDetailDto getLevelById(Long id) {
        Level level = levelRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Level not found with ID: " + id));

        // Extraemos la definición del JSON (si existe)
        LevelDefinition content = level.getContent();
        List<LevelStepDto> stepsDto = List.of();

        if (content != null && content.steps() != null) {
            // Convertimos los pasos internos (con secretos) a DTOs públicos (sin secretos)
            stepsDto = content.steps().stream()
                    .map(step -> new LevelStepDto(
                            step.id(),
                            step.instruction(),
                            step.hint()
                    ))
                    .toList();
        }

        System.out.println("Level: " + level + " Steps: " + stepsDto);

        return new LevelDetailDto(
                level.getId(),
                level.getTitle(),
                level.getDescription(),
                level.getDifficulty().name(),
                stepsDto
        );
    }

    /**
     * Valida la query del usuario contra un PASO específico del nivel.
     */
    @Transactional
    public ValidationResultDto validateStep(Long levelId, Integer stepId, String userSql) {
        Level level = levelRepository.findById(levelId)
                .orElseThrow(() -> new ResourceNotFoundException("Level not found"));

        // 1. Buscar el paso específico dentro del JSON del nivel
        Optional<LevelDefinition.LevelStep> stepOptional = level.getContent().steps().stream()
                .filter(s -> s.id().equals(stepId))
                .findFirst();

        if (stepOptional.isEmpty()) {
            throw new ResourceNotFoundException("Step " + stepId + " not found in level " + levelId);
        }

        String validationQuery = stepOptional.get().validationQuery();

        try {
            log.info("🔍 Validating Level {} Step {}: {}", levelId, stepId, userSql);

            // 2. CAMBIO DE CONTEXTO (Schemas)
            // Esto asegura que 'SELECT * FROM usuarios' busque en 'level_1.usuarios'
            // Nota: Para Postgres usar "SET search_path TO level_..."
            String schemaName = "level_" + levelId;
            jdbcTemplate.execute("CREATE SCHEMA IF NOT EXISTS " + schemaName);
            jdbcTemplate.execute("SET SCHEMA " + schemaName);

            List<Map<String, Object>> userResults = jdbcTemplate.queryForList(userSql);
            List<Map<String, Object>> expectedResults = jdbcTemplate.queryForList(validationQuery);
            boolean isCorrect = userResults.equals(expectedResults);

            String message;
            if (isCorrect) {
                message = "¡Excelente! Has completado este paso. 🎉";
            } else {
                message = "Los resultados no coinciden con lo esperado. Revisa tus filtros u ordenamiento.";
            }

            return new ValidationResultDto(isCorrect, message, userResults);

        } catch (DataAccessException e) {
            log.error("SQL Error: {}", e.getMessage());
            String errorMsg = e.getMostSpecificCause().getMessage();
            return new ValidationResultDto(false, "Error SQL: " + errorMsg, null);
        }
    }
}