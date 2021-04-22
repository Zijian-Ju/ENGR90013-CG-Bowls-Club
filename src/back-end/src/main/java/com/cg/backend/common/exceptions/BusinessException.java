package com.cg.backend.common.exceptions;

import lombok.Data;
import com.cg.backend.common.enums.ResponseCode;

@Data
public class BusinessException extends RuntimeException{

    private Integer statusCode;
    private String message;

    public BusinessException(ResponseCode responseCode){
        this.statusCode = responseCode.getCode();
        this.message = responseCode.getMessage();
    }

}
