package com.cg.backend.service;

import com.cg.backend.common.enums.ResponseCode;
import com.cg.backend.common.exceptions.BusinessException;
import com.cg.backend.dao.UserMapper;
import com.cg.backend.model.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tk.mybatis.mapper.entity.Example;

import javax.annotation.Resource;
import java.util.*;

@Service("ssoService")
@Slf4j
public class SSOService {

    @Resource
    private UserMapper userMapper;

    /**
     *
     * @param user
     * @return
     */
    public Map<String, Object> login(User user) {
        Example example = new Example(User.class);
        Example.Criteria criteria = example.createCriteria();
        criteria.andEqualTo("email", user.getEmail());
        criteria.andEqualTo("password", user.getPassword());

        List<User> userList = userMapper.selectByExample(example);
        if(userList.size() < 1)
            throw new BusinessException(ResponseCode.EMAIL_OR_PASWORD_ERROR);
        user = userList.get(0);
        user.setToken(UUID.randomUUID().toString().replaceAll("-",""));
        user.setTokenCreateDate(new Date());

        userMapper.updateByPrimaryKey(user);
        user.setPassword("");

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("user", user);
        resultMap.put("token", user.getToken());

        return resultMap;
    }

    public User checkToken(String email, String token){

        // check token
        Example example = new Example(User.class);
        Example.Criteria criteria = example.createCriteria();
        criteria.andEqualTo("email", email);
        criteria.andEqualTo("token", token);

        List<User> userList = userMapper.selectByExample(example);
        if(userList.size() < 1)
            throw new BusinessException(ResponseCode.TOKEN_CHECK_ERROR);

        User user = userList.get(0);
        Date createDate = user.getTokenCreateDate();
        Date currDate = new Date(); //Current DateTime

        Calendar createCalendar = new GregorianCalendar();
        createCalendar.setTime(createDate);
        createCalendar.add(createCalendar.DATE, 1);
        createDate = createCalendar.getTime();
        if(createDate.compareTo(currDate) < 0)
            throw new BusinessException(ResponseCode.TOKEN_CHECK_ERROR);

        user.setTokenCreateDate(createDate);
        userMapper.updateByPrimaryKey(user);

        return user;
    }



}
