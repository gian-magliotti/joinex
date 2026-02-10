package com.joinex.api.dto;

import java.util.List;

public record LevelDetailDto(
        Long id,
        String title,
        String description,
        String difficulty,
        List<LevelStepDto> steps
) {}