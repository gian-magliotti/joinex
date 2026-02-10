package com.joinex.api.dto;

import java.time.LocalDateTime;

public record ErrorResponseDto(
        int status,
        String message,
        LocalDateTime timestamp
) {}