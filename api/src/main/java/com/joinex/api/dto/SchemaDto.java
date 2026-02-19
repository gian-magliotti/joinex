package com.joinex.api.dto;

import java.util.List;

public record SchemaDto(
        String name,
        List<ColumnSchemaDto> columns
) {}