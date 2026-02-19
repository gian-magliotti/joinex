package com.joinex.api.dto;

public record ColumnSchemaDto(
        String name,
        String type,
        boolean pk,
        boolean fk
) {}
