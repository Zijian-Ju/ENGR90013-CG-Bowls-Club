package com.cg.backend.common.config;


import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@WebFilter(urlPatterns = "/*", filterName = "CorsFilter")
@Slf4j
public class CorsFilter implements Filter {


    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        HttpServletResponse response = (HttpServletResponse) res;
        HttpServletRequest reqs = (HttpServletRequest) req;
        String uri = ((HttpServletRequest) req).getRequestURI();
        String token = ((HttpServletRequest) req).getHeader("Access-Token");
        log.trace(uri);
        String curOrigin = reqs.getHeader("Origin");
        response.setHeader("Access-Control-Allow-Origin", curOrigin == null ? "true" : curOrigin);
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, PATCH, DELETE, PUT");
        response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, " +
                                "Access-Token");
        chain.doFilter(req, res);
    }


    @Override
    public void init(FilterConfig filterConfig) {
        System.out.println("===Custom Filter Started===");
    }

    @Override
    public void destroy() {}

}
