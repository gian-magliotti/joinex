package com.joinex.api.model;

import com.joinex.api.dto.SchemaDto;

import java.io.Serializable;
import java.util.List;

public record LevelDefinition(
        List<String> setupSql,
        List<SchemaDto> schemas,
        List<LevelStep> steps
) implements Serializable {

    public record LevelStep(
            Integer id,
            String instruction,
            String hint,
            String validationQuery
    ) {}
}