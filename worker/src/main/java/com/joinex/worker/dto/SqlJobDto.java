package com.joinex.worker.dto;

import java.io.Serializable;
import java.util.List;

public record SqlJobDto(
        String jobId,
        List<String> setupSql,
        String userSql,
        String validationSql
) implements Serializable {}