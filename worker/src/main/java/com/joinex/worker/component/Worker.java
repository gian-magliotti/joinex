package com.joinex.worker.component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.joinex.worker.dto.SqlJobDto;
import com.joinex.worker.dto.ValidationResultDto;
import com.joinex.worker.service.SqlResultComparator;
import com.joinex.worker.service.SqlSandboxService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.Duration;

@Slf4j
@Component
@RequiredArgsConstructor
public class Worker {

    private final StringRedisTemplate redisTemplate;
    private final SqlSandboxService sandboxService;
    private final SqlResultComparator resultComparator; // 🆕 NUEVO
    private final ObjectMapper objectMapper;

    private static final String QUEUE_NAME = "sql_jobs_queue";
    private static final String RESULT_KEY_PREFIX = "result:";
    private static final Duration BLOCK_TIMEOUT = Duration.ofSeconds(5);
    private static final Duration RESULT_TTL = Duration.ofMinutes(10);

    @Scheduled(fixedDelay = 50)
    public void processNextJob() {

        String jobJson = redisTemplate.opsForList()
                .rightPop(QUEUE_NAME, BLOCK_TIMEOUT);

        if (jobJson == null) {
            return;
        }

        SqlJobDto job = null;

        try {
            job = objectMapper.readValue(jobJson, SqlJobDto.class);
            log.info("Worker picked job {}", job.jobId());

            ValidationResultDto result = executeJobSafely(job);

            saveResult(job.jobId(), result);

            log.info("Job {} finished successfully", job.jobId());

        } catch (Exception e) {
            log.error("Fatal error processing job payload", e);

            if (job != null) {
                saveResult(job.jobId(),
                        new ValidationResultDto(
                                false,
                                "Worker internal error",
                                null
                        )
                );
            }
        }
    }

    private ValidationResultDto executeJobSafely(SqlJobDto job) {

        try {
            SqlSandboxService.ExecutionResult execResult =
                    sandboxService.executeInSandbox(
                            job.setupSql(),
                            job.userSql(),
                            job.validationSql()
                    );

            if (execResult.error() != null) {
                return new ValidationResultDto(
                        false,
                        "SQL Error: " + execResult.error(),
                        null
                );
            }

            boolean correct = resultComparator.areEqual(
                    execResult.userResults(),
                    execResult.expectedResults()
            );

            return new ValidationResultDto(
                    correct,
                    correct ? "Correct solution." : "Results do not match.",
                    execResult.userResults()
            );

        } catch (Exception e) {
            log.error("Sandbox execution failed for job {}", job.jobId(), e);

            return new ValidationResultDto(
                    false,
                    "Sandbox execution failed",
                    null
            );
        }
    }

    private void saveResult(String jobId, ValidationResultDto result) {
        try {
            String resultJson = objectMapper.writeValueAsString(result);

            redisTemplate.opsForValue().set(
                    RESULT_KEY_PREFIX + jobId,
                    resultJson,
                    RESULT_TTL
            );

        } catch (Exception e) {
            log.error("CRITICAL: Could not save result for job {}", jobId, e);
        }
    }
}
