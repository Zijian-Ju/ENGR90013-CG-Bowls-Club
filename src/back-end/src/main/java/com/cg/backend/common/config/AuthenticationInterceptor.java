package com.cg.backend.common.config;

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

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String uri = request.getRequestURI();
        String token = request.getHeader("Access-Token");
        String email = request.getHeader("Email");
        User user = null;
        if(token != null){
            user = ssoService.checkToken(email, token);
            permissionService.checkPermission(uri, user);
            // 1. check uri, whether in BOWLS_CLUB.t_api_permission
            // 1.1 False, Pass
            // 1.2 True, check token and check create date
                // 2.1 False, throw Business Exception TOKEN_CHECK_ERROR
                // 2.2 True, check permission
                    // 3.1 False, throw Business Exception PERMISSION_DENIED
                    // 3.2 True, pass
        }
//        permissionService.checkPermission(uri, user);
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {

    }
    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {

    }
}
