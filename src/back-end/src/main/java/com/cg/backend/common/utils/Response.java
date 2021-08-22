package com.cg.backend.common.utils;

import com.cg.backend.common.enums.ResponseCode;
import lombok.Data;
import org.slf4j.LoggerFactory;

@Data
public class Response <T> {
    @SuppressWarnings("unused")
    private static final org.slf4j.Logger log = LoggerFactory.getLogger(Response.class);

    private static final long serialVersionUID = -1802122468331526708L;
    private int statusCode = -1;
    private String message = "待处理";
    private T data;

    public Response() {

    }

    public static Response success(){
        Response response = new Response();
        response.setResponseCode(ResponseCode.SUCCESS);
        return response;
    }

    public static Response success(Object data){
        Response response = new Response();
        response.setResponseCode(ResponseCode.SUCCESS);
        response.setData(data);
        return response;
    }

    public static Response fail(Integer code, String message){
        Response response = new Response();
        response.setStatusCode(code);
        response.setMessage(message);
        return response;
    }

    public static Response fail(ResponseCode responseCode){
        Response response = new Response();
        response.setResponseCode(responseCode);
        return response;
    }

    private void setResponseCode(ResponseCode responseCode){
        this.statusCode = responseCode.getCode();
        this.message = responseCode.getMessage();
    }


}
