package com.joinex.worker.service;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.testcontainers.containers.PostgreSQLContainer;

import javax.sql.DataSource;
import java.sql.*;
import java.time.Duration;
import java.util.*;

@Service
@Slf4j
public class SqlSandboxService {

    private static final PostgreSQLContainer<?> postgresContainer =
            new PostgreSQLContainer<>("postgres:15-alpine")
                    .withDatabaseName("sandbox")
                    .withUsername("sandbox_user")
                    .withPassword("sandbox_pass")
                    .withReuse(true);

    private DataSource dataSource;
    private static final int QUERY_TIMEOUT_SECONDS = 5;

    @PostConstruct
    public void startContainer() {
        log.info("Starting PostgreSQL Sandbox...");
        postgresContainer.start();

        HikariConfig config = new HikariConfig();
        config.setJdbcUrl(postgresContainer.getJdbcUrl());
        config.setUsername(postgresContainer.getUsername());
        config.setPassword(postgresContainer.getPassword());
        config.setMaximumPoolSize(10);

        this.dataSource = new HikariDataSource(config);

        log.info("Sandbox ready");
    }

    @PreDestroy
    public void stopContainer() {
        postgresContainer.stop();
    }

    public ExecutionResult executeInSandbox(List<String> setupSql,
                                            String userSql,
                                            String validationSql) {

        String schema = "job_" + UUID.randomUUID().toString().replace("-", "");

        try (Connection conn = dataSource.getConnection();
             Statement stmt = conn.createStatement()) {

            stmt.setQueryTimeout(QUERY_TIMEOUT_SECONDS);
            stmt.execute("CREATE SCHEMA " + schema);
            stmt.execute("SET search_path TO " + schema);

            try {
                conn.setAutoCommit(false);
                if (setupSql != null) {
                    for (String sql : setupSql) {
                        stmt.execute(sql);
                    }
                }

                List<Map<String,Object>> expectedResults =
                        runQuery(stmt, validationSql);

                List<Map<String,Object>> userResults;
                try {
                    userResults = runQuery(stmt, userSql);
                } catch (Exception e) {
                    conn.rollback();
                    dropSchemaQuietly(schema);
                    return new ExecutionResult(null, expectedResults, e.getMessage());
                }

                conn.rollback();

                dropSchemaQuietly(schema);

                return new ExecutionResult(userResults, expectedResults, null);

            } catch (Exception e) {
                conn.rollback();
                dropSchemaQuietly(schema);
                return new ExecutionResult(null, null,
                        "Sandbox error: " + e.getMessage());
            }

        } catch (Exception e) {
            return new ExecutionResult(null, null,
                    "Sandbox infra error: " + e.getMessage());
        }
    }

    private void dropSchemaQuietly(String schema) {
        try (Connection c = dataSource.getConnection();
             Statement s = c.createStatement()) {
            s.execute("DROP SCHEMA IF EXISTS " + schema + " CASCADE");
        } catch (Exception e) {
            log.error("Failed to drop schema {}", schema, e);
        }
    }

    private List<Map<String,Object>> runQuery(Statement stmt, String sql) throws Exception {
        List<Map<String,Object>> results = new ArrayList<>();

        try (ResultSet rs = stmt.executeQuery(sql)) {
            var meta = rs.getMetaData();
            int columns = meta.getColumnCount();

            while (rs.next()) {
                Map<String,Object> row = new LinkedHashMap<>();
                for (int i = 1; i <= columns; i++) {
                    row.put(meta.getColumnLabel(i), rs.getObject(i));
                }
                results.add(row);
            }
        }
        return results;
    }

    public record ExecutionResult(
            List<Map<String,Object>> userResults,
            List<Map<String,Object>> expectedResults,
            String error
    ) {}
}
