package com.cg.backend.model;

import lombok.Data;

import java.util.List;
@Data
public class PlayerFilter {
    private int minScore;
    private int maxScore;
    private List<Integer> availability;
    private List<String> position;

    private Order order;

}
