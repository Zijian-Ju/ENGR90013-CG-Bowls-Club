package com.cg.backend.common.config;

import com.cg.backend.common.enums.ResponseCode;
import com.cg.backend.common.exceptions.BusinessException;
import com.cg.backend.model.APIPermission;
import com.cg.backend.model.User;
import com.cg.backend.service.PermissionService;
import com.cg.backend.service.SSOService;
import com.cg.backend.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.annotation.Resource;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@Component
public class AuthenticationInterceptor implements HandlerInterceptor {

    @Resource
    SSOService ssoService;

    @Resource
    PermissionService permissionService;

    /* Permission Check Process
     1. check uri, whether in BOWLS_CLUB.t_api_permission
     1.1 False, Pass
     1.2 True, check token and check create date
     2.1 throwFalse, throw Business Exception TOKEN_CHECK_ERROR
     2.2 True, check permission
     3.1 False, throw Business Exception PERMISSION_DENIED
     3.2 True, pass
   */

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String uri = request.getRequestURI();
        String token = request.getHeader("Access-Token");
        String email = request.getHeader("Email");
        User user = null;

        APIPermission permission = permissionService.getRequiredPermission(uri);

        if (permission == null) {
            return true;
        }

        if (token == null) {
            throw new BusinessException(ResponseCode.PERMISSION_DENIED);
        }

        user = ssoService.checkToken(email, token);
        if (permission.getRole().equals(PermissionService.ADMIN_ROLE)) {
            return true;
        }

        if (!permission.getRole().contains(user.getRole()))
            throw new BusinessException(ResponseCode.PERMISSION_DENIED);

        return  true;
    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {

    }
    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {

    }
}
