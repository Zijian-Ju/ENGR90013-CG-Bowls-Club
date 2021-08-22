package com.cg.backend.model;

import lombok.Data;

@Data
public class Order {
    public static final String ASC_ORDER = "asc";
    public static final String DESC_ORDER = "desc";

    private String sortField;
    private String direction;


}
