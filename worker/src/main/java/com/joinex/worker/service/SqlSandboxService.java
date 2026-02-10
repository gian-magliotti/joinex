package com.joinex.worker.service;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import org.springframework.stereotype.Service;
import org.testcontainers.containers.PostgreSQLContainer;

import javax.sql.DataSource;
import java.sql.*;
import java.time.Duration;
import java.util.*;

@Service
public class SqlSandboxService {

    private static final PostgreSQLContainer<?> postgresContainer =
            new PostgreSQLContainer<>("postgres:15-alpine")
                    .withDatabaseName("sandbox")
                    .withUsername("gamer")
                    .withPassword("password")
                    .withReuse(true);

    private DataSource dataSource;
    private static final int QUERY_TIMEOUT_SECONDS = 5;

    @PostConstruct
    public void startContainer() {
        System.out.println("Starting PostgreSQL Sandbox...");
        postgresContainer.start();

        HikariConfig config = new HikariConfig();
        config.setJdbcUrl(postgresContainer.getJdbcUrl());
        config.setUsername(postgresContainer.getUsername());
        config.setPassword(postgresContainer.getPassword());
        config.setMaximumPoolSize(10);
        config.setConnectionTimeout(Duration.ofSeconds(10).toMillis());

        this.dataSource = new HikariDataSource(config);
        System.out.println("Sandbox ready");
    }

    @PreDestroy
    public void stopContainer() {
        postgresContainer.stop();
    }

    public ExecutionResult executeInSandbox(List<String> setupSql,
                                            String userSql,
                                            String validationSql) {

        String schema = "schema_" + UUID.randomUUID().toString().replace("-", "");
        List<Map<String,Object>> expectedResults = new ArrayList<>();
        List<Map<String,Object>> userResults = new ArrayList<>();
        String error = null;

        try (Connection conn = dataSource.getConnection()) {

            conn.setAutoCommit(false);

            try (Statement stmt = conn.createStatement()) {
                stmt.setQueryTimeout(QUERY_TIMEOUT_SECONDS);
                stmt.execute("CREATE SCHEMA " + schema);
                stmt.execute("SET search_path TO " + schema);

                if (setupSql != null) {
                    for (String sql : setupSql) {
                        stmt.execute(sql);
                    }
                }
                expectedResults = runQuery(stmt, validationSql);

                try {
                    userResults = runQuery(stmt, userSql);
                } catch (Exception e) {
                    error = e.getMessage();
                }
                conn.rollback();
            }

        } catch (Exception e) {
            return new ExecutionResult(null, null,
                    "Sandbox system error: " + e.getMessage());
        }

        return new ExecutionResult(userResults, expectedResults, error);
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
