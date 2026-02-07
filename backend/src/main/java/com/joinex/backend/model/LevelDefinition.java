package com.joinex.backend.model;

import java.io.Serializable;
import java.util.List;

public record LevelDefinition(
        List<String> setupSql,
        List<LevelStep> steps
) implements Serializable {

    public record LevelStep(
            Integer id,
            String instruction,
            String hint,
            String validationQuery
    ) {}
}