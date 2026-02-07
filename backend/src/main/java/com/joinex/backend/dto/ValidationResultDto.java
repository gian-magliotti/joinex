package com.joinex.backend.dto;

import java.util.List;
import java.util.Map;
public record ValidationResultDto(
        boolean correct,
        String message,
        List<Map<String, Object>> results
) {}