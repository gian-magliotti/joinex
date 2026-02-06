package com.joinex.backend.config;

import com.joinex.backend.model.Level;
import com.joinex.backend.repository.LevelRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

import java.io.InputStream;
import java.util.List;

@Component
public class LevelJsonLoader implements CommandLineRunner {

    private final LevelRepository levelRepository;
    private final ObjectMapper objectMapper;

    public LevelJsonLoader(LevelRepository levelRepository, ObjectMapper objectMapper) {
        this.levelRepository = levelRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public void run(String... args) {
        if (levelRepository.count() == 0) {
            try {
                System.out.println("📂 Cargando niveles desde levels.json...");
                InputStream inputStream = TypeReference.class.getResourceAsStream("/levels.json");
                List<Level> levels = objectMapper.readValue(inputStream, new TypeReference<List<Level>>(){});
                levelRepository.saveAll(levels);
                System.out.println("✅ ¡Éxito! Se han creado " + levels.size() + " niveles.");
            } catch (Exception e) {
                System.out.println("❌ Error al cargar el JSON: " + e.getMessage());
                e.printStackTrace();
            }
        } else {
            System.out.println("🎮 La base de datos ya tiene niveles. Saltando carga inicial.");
        }
    }
}