package com.cg.backend.common.enums;



public enum ResponseCode {

    SUCCESS(200, "Success"),
    EMAIL_HAS_EXSITED(20001, "Email is already exsited!"),
    PARAM_IS_INVALID(20002, "Param is invalid."),
    PLAYER_NOT_EXIST(20003, "Player is not exist."),
    SYSTEM_ERROR(10000, "System Error, Please Contact Admin."),
    PERFORMANCE_RECORD_NOT_FOUND(20003, "Performance record not found");


    private Integer code;
    private String message;

    ResponseCode(Integer code, String message) {
        this.code = code;
        this.message = message;
    }

    public Integer getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
