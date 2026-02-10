package com.joinex.api.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.joinex.api.dto.*;
import com.joinex.api.exception.ResourceNotFoundException;
import com.joinex.api.model.Level;
import com.joinex.api.model.LevelDefinition;
import com.joinex.api.repository.LevelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class GameService {

    private final LevelRepository levelRepository;
    private final StringRedisTemplate redisTemplate;
    private final ObjectMapper objectMapper;

    private static final String QUEUE_NAME = "sql_jobs_queue";
    private static final String RESULT_KEY_PREFIX = "result:";


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

    @Transactional(readOnly = true)
    public LevelDetailDto getLevelById(Long id) {
        Level level = levelRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Level not found with ID: " + id));

        LevelDefinition content = level.getContent();
        List<LevelStepDto> stepsDto = List.of();

        if (content != null && content.steps() != null) {
            stepsDto = content.steps().stream()
                    .map(step -> new LevelStepDto(
                            step.id(),
                            step.instruction(),
                            step.hint()
                    ))
                    .toList();
        }

        return new LevelDetailDto(
                level.getId(),
                level.getTitle(),
                level.getDescription(),
                level.getDifficulty().name(),
                stepsDto
        );
    }

    @Transactional(readOnly = true)
    public String submitValidationJob(Long levelId, Integer stepId, String userSql) {
        Level level = levelRepository.findById(levelId)
                .orElseThrow(() -> new ResourceNotFoundException("Level not found"));

        Optional<LevelDefinition.LevelStep> stepOptional = level.getContent().steps().stream()
                .filter(s -> s.id().equals(stepId))
                .findFirst();

        if (stepOptional.isEmpty()) {
            throw new ResourceNotFoundException("Step " + stepId + " not found");
        }
        LevelDefinition.LevelStep step = stepOptional.get();
        String jobId = UUID.randomUUID().toString();
        SqlJobDto job = new SqlJobDto(
                jobId,
                level.getContent().setupSql(),
                userSql,
                step.validationQuery()
        );

        try {
            String jobJson = objectMapper.writeValueAsString(job);
            redisTemplate.opsForList().leftPush(QUEUE_NAME, jobJson);
            redisTemplate.opsForValue().set(RESULT_KEY_PREFIX + jobId, "PROCESSING", 10, TimeUnit.MINUTES);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error interno al procesar la solicitud", e);
        }
        return jobId;
    }

    public String getJobResult(String jobId) {
        return redisTemplate.opsForValue().get(RESULT_KEY_PREFIX + jobId);
    }
}