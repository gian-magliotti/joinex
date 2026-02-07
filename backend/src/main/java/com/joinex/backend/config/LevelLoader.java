package com.joinex.backend.config;

import com.joinex.backend.model.Level;
import com.joinex.backend.repository.LevelRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import tools.jackson.databind.ObjectMapper;


import java.io.IOException;
import java.util.Arrays;
import java.util.Comparator;

@Component
public class LevelLoader implements CommandLineRunner {

    private final LevelRepository levelRepository;
    private final ObjectMapper objectMapper;
    private final JdbcTemplate jdbcTemplate;
    private final ResourcePatternResolver resourceResolver;

    public LevelLoader(LevelRepository levelRepository, ObjectMapper objectMapper, JdbcTemplate jdbcTemplate, ResourcePatternResolver resourceResolver) {
        this.levelRepository = levelRepository;
        this.objectMapper = objectMapper;
        this.jdbcTemplate = jdbcTemplate;
        this.resourceResolver = resourceResolver;
    }

    @Override
    public void run(String... args) {
        try {
            System.out.println("📂 Buscando archivos de niveles en: classpath:levels/*.json");

            Resource[] resources = resourceResolver.getResources("classpath:levels/*.json");

            if (resources.length == 0) {
                System.out.println("⚠️ No se encontraron niveles. Crea la carpeta src/main/resources/levels");
                return;
            }

            Arrays.sort(resources, Comparator.comparing(Resource::getFilename));

            for (Resource resource : resources) {
                try {
                    // Ahora sí usará el Jackson correcto para leer el JSON
                    Level level = objectMapper.readValue(resource.getInputStream(), Level.class);

                    levelRepository.save(level);
                    System.out.println("   -> Procesando: " + resource.getFilename() + " (ID: " + level.getId() + ")");

                    if (level.getContent() != null && level.getContent().setupSql() != null) {
                        String schemaName = "level_" + level.getId();

                        // Lógica H2
                        jdbcTemplate.execute("CREATE SCHEMA IF NOT EXISTS " + schemaName);
                        jdbcTemplate.execute("SET SCHEMA " + schemaName);

                        for (String sqlCommand : level.getContent().setupSql()) {
                            jdbcTemplate.execute(sqlCommand);
                        }
                        jdbcTemplate.execute("SET SCHEMA PUBLIC");
                    }
                } catch (IOException e) {
                    System.err.println("❌ Error leyendo el archivo " + resource.getFilename() + ": " + e.getMessage());
                }
            }
            System.out.println("✅ ¡Carga completa!");

        } catch (IOException e) {
            System.err.println("❌ Error crítico: " + e.getMessage());
            e.printStackTrace();
        }
    }
}