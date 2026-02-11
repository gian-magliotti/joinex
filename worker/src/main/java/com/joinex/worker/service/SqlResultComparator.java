package com.joinex.worker.service;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class SqlResultComparator {

    public boolean areEqual(List<Map<String,Object>> user,
                            List<Map<String,Object>> expected) {

        if (user == null || expected == null) return false;
        if (user.size() != expected.size()) return false;

        List<String> normalizedUser = normalizeRows(user);
        List<String> normalizedExpected = normalizeRows(expected);

        return normalizedUser.equals(normalizedExpected);
    }

    private List<String> normalizeRows(List<Map<String,Object>> rows) {
        return rows.stream()
                .map(this::normalizeRow)
                .sorted()
                .toList();
    }

    private String normalizeRow(Map<String,Object> row) {
        return row.entrySet().stream()
                .sorted(Map.Entry.comparingByKey())
                .map(entry -> normalizeValue(entry.getValue()))
                .collect(Collectors.joining("|"));
    }

    private String normalizeValue(Object value) {

        if (value == null) return "NULL";

        if (value instanceof Number number) {
            return new BigDecimal(number.toString())
                    .stripTrailingZeros()
                    .toPlainString();
        }

        if (value instanceof String str) {
            return str.trim().toLowerCase();
        }

        return value.toString().trim().toLowerCase();
    }
}
