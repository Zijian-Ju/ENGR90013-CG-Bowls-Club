package com.cg.backend.controller;

import com.cg.backend.common.enums.ResponseCode;
import com.cg.backend.common.exceptions.BusinessException;
import com.cg.backend.service.EmailService;
import com.cg.backend.service.UserService;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import com.cg.backend.model.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.util.Assert;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;


@RestController
@EnableAutoConfiguration
@Slf4j
public class UserController {

    // private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Value("${com.cg.helloworld}")
    private String hello;

    @Resource
    private UserService userService;

    @Resource
    private EmailService emailService;


    @RequestMapping(value="/user/hellowolrd", method= RequestMethod.GET, produces="application/json")
    public String getHelloWorld(){
        return this.hello;
    }

    @ApiOperation("Get Userinfo by UserID")
    @RequestMapping(value="/user/getuserbyid", method= RequestMethod.POST, produces="application/json")
    public User GetUserById(){
        User user = null;
        Assert.notNull(user, "User is not existed.");
        return user;
    }

    @RequestMapping(value="/user/getuserbyusername", method= RequestMethod.POST, produces="application/json")
    public List<User> GetUserByUsername(@RequestBody String username){

        return this.userService.GetUserByUsername(username);
    }

    @RequestMapping(value="/user/getAllUser", method= RequestMethod.POST, produces="application/json")
    public List<User> getAllUser(@RequestBody String username){

        return this.userService.getAllUser();
    }

    @RequestMapping(value="/user/error", method= RequestMethod.GET, produces="application/json")
    public double error(){
        return 9/0;
    }

    @RequestMapping(value="/user/businesserror", method= RequestMethod.GET, produces="application/json")
    public void BusinessError(){
        throw new BusinessException(ResponseCode.EMAIL_HAS_EXSITED);
    }

    @RequestMapping(value="/user/createuser", method= RequestMethod.POST, produces="application/json")
    public String CreateUser(@RequestBody @Validated User user){

        return this.hello;
    }



    @RequestMapping(value="/log", method= RequestMethod.GET, produces="application/json")
    public void logging(){
        log.trace("trace");
        log.debug("trace");
        log.info("trace");
        log.warn("trace");
        log.error("trace");

    }

}
