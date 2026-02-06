package com.joinex.backend.dto;

public record CreateLevel(
        String title,
        String description,
        String solutionQuery
) {}