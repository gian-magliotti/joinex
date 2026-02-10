package com.joinex.api.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@Table(name = "levels")
@Data
public class Level {
    @Id
    private Long id;

    private String title;

    @Column(length = 1000)
    private String description;

    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;

    @JdbcTypeCode(SqlTypes.JSON)
    //@Column(columnDefinition = "jsonb")
    private LevelDefinition content;
}