package com.cg.backend.controller;

import com.cg.backend.model.User;
import com.cg.backend.service.SSOService;
import com.cg.backend.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

@RestController
@EnableAutoConfiguration
@Slf4j
public class SSOController {

    @Resource
    private UserService userService;

    @Resource
    private SSOService ssoService;

    @RequestMapping(value="/sso/login", method= RequestMethod.POST, produces="application/json")
    public Map<String, Object> login(@RequestBody User user){
        return ssoService.login(user);
    }

    @RequestMapping(value="/sso/addUser", method= RequestMethod.POST, produces="application/json")
    public boolean addUser(@RequestBody User user){
        return userService.addUser(user);
    }


    @RequestMapping(value="/sso/editUser", method= RequestMethod.POST, produces="application/json")
    public boolean editUser(@RequestBody User user){
        return userService.editUser(user);
    }


    @RequestMapping(value="/sso/deleteUser", method= RequestMethod.POST, produces="application/json")
    public boolean deleteUser(@RequestBody User user){
        return userService.deleteUser(user);
    }
}
