package com.joinex.backend.service;

import com.joinex.backend.dto.GameResponse;
import com.joinex.backend.model.Level;
import com.joinex.backend.repository.LevelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class GameService {

    @Autowired
    private LevelRepository levelRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public GameResponse validateLevel(Long levelId, String userSql) {
        Level level = levelRepository.findById(levelId)
                .orElseThrow(() -> new RuntimeException("Nivel no encontrado"));

        try {
            String sqlUpper = userSql.toUpperCase();
            if (sqlUpper.contains("DROP") || sqlUpper.contains("DELETE") ||
                    sqlUpper.contains("INSERT") || sqlUpper.contains("UPDATE")) {
                return new GameResponse(false, "Solo se permite consultar (SELECT).", null);
            }
            limpiarEntorno();

            jdbcTemplate.execute(level.getInitScript());

            List<Map<String, Object>> userResult = jdbcTemplate.queryForList(userSql);
            List<Map<String, Object>> solutionResult = jdbcTemplate.queryForList(level.getSolutionQuery());

            boolean isCorrect = userResult.equals(solutionResult);
            String message = isCorrect ? "¡Correcto! Has resuelto el caso." : "Resultados incorrectos. Sigue buscando.";

            return new GameResponse(isCorrect, message, userResult);

        } catch (Exception e) {
            return new GameResponse(false, "Error SQL: " + e.getMessage(), null);
        }
    }

    private void limpiarEntorno() {
        try {
            String sqlListarTablas = "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='PUBLIC'";
            List<String> tablas = jdbcTemplate.queryForList(sqlListarTablas, String.class);

            for (String tabla : tablas) {
                if (!tabla.equalsIgnoreCase("LEVELS") && !tabla.equalsIgnoreCase("flyway_schema_history")) {
                    jdbcTemplate.execute("DROP TABLE IF EXISTS " + tabla + " CASCADE");
                }
            }
        } catch (Exception e) {
            System.err.println("Error limpiando tablas viejas: " + e.getMessage());
        }
    }
}