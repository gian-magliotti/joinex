package com.joinex.api.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.joinex.api.model.Level;
import com.joinex.api.repository.LevelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Arrays;
import java.util.Comparator;

@Component
@RequiredArgsConstructor
public class LevelLoader implements CommandLineRunner {

    private final LevelRepository levelRepository;
    private final ObjectMapper objectMapper;
    private final ResourcePatternResolver resourceResolver;

    @Override
    public void run(String... args) {
        try {
            System.out.println("📂 Buscando archivos de niveles en: classpath:levels/*.json");

            Resource[] resources = resourceResolver.getResources("classpath:levels/*.json");

            if (resources.length == 0) {
                System.out.println("⚠️ No se encontraron niveles.");
                return;
            }

            Arrays.sort(resources, Comparator.comparing(Resource::getFilename));

            for (Resource resource : resources) {
                try {
                    Level level = objectMapper.readValue(resource.getInputStream(), Level.class);
                    levelRepository.save(level);
                    System.out.println("   -> Nivel cargado: " + resource.getFilename() + " (ID: " + level.getId() + ")");
                } catch (IOException e) {
                    System.err.println("❌ Error leyendo archivo " + resource.getFilename() + ": " + e.getMessage());
                }
            }
            System.out.println("✅ Carga completa de niveles.");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}