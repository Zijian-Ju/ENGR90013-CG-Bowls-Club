package com.cg.backend.common.enums;



public enum ResponseCode {

    SUCCESS(200, "Success"),
    EMAIL_HAS_EXSITED(20001, "Email is already exsited!"),
    PARAM_IS_INVALID(20002, "Param is invalid."),
    PLAYER_NOT_EXIST(20003, "Player is not exist."),
    PERFORMANCE_RECORD_NOT_FOUND(20004, "Performance record not found"),
    TEAM_RECORD_NOT_FOUND(20005, "Team is not exist."),
    EMAIL_OR_PASWORD_ERROR(20006, "The email or password is wrong."),
    EMAIL_ALREADY_EXISTED(20007, "The email is already existed."),
    EMAIL_IS_NOT_EXISTED(20008, "The email is not existed."),
    TOKEN_CHECK_ERROR(21001, "The user is not logged in or the login has expired. Please login again"),
    PERMISSION_DENIED(21002, "The user is not authorized to perform this operation."),

    SYSTEM_ERROR(10000, "System Error, Please Contact Admin.");


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
