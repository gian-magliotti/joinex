package com.joinex.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "levels")
@Data
public class Level {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    @Column(columnDefinition = "TEXT")
    private String initScript;

    @Column(columnDefinition = "TEXT")
    private String solutionQuery;
}