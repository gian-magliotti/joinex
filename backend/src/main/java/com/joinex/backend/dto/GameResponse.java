package com.joinex.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
public class GameResponse {
    private boolean correct;
    private String message;
    private List<Map<String, Object>> results;
}