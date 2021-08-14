package com.cg.backend.service;


import com.cg.backend.common.enums.ResponseCode;
import com.cg.backend.common.exceptions.BusinessException;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.session.RowBounds;
import com.cg.backend.dao.UserMapper;
import com.cg.backend.model.User;
import org.springframework.stereotype.Service;
import tk.mybatis.mapper.entity.Example;

import javax.annotation.Resource;
import javax.swing.plaf.basic.BasicOptionPaneUI;
import java.util.*;

@Service("userService")
@Slf4j
public class UserService {

    @Resource
    private UserMapper userMapper;
    @Resource
    private EmailService emailService;


    public List<User> GetUserByUsername(String name) {
        long id = 1;
        User username = new User();
        username.setUserName(name);
        emailService.SendEmail(id);

        Example example = new Example(User.class);
        Example.Criteria criteria = example.createCriteria();
        criteria.andEqualTo("userName", name);


        log.info("-------------------Criteria   where查询--------------------------");
        log.info(String.valueOf(this.userMapper.selectByExample(example)));

        log.info("-------------------Criteria   where查询 order by id--------------------------");
        example = new Example(User.class);
        example.setOrderByClause("USER_ID desc");
        criteria = example.createCriteria();
        
        criteria.andLike("userName", "%abc%");
//        IN查询
//        List idList = new ArrayList();
//        idList.add(1);
//        idList.add(2);
//        criteria.andIn("USER_ID", idList);
        log.info(String.valueOf(this.userMapper.selectByExample(example)));

        log.info("-------------------Paging--------------------------");
        List<User> userList = this.userMapper.selectAll();
        log.info("Total: {}", userList.size());
        List<User> userList1 = this.userMapper.selectByRowBounds(new User(), new RowBounds(0, 10));
        log.info("Page 1: {}", userList1);

        log.info("-------------------Paging2--------------------------");
        example = new Example(User.class);
        criteria = example.createCriteria();
        criteria.andEqualTo("userName", "abc1");
        int count = this.userMapper.selectCountByExample(example);
        log.info("Total: {}", count);
        userList1 = this.userMapper.selectByExampleAndRowBounds(new User(), new RowBounds(0, 10));
        log.info("Page 1: {}", userList1);

        return userMapper.select(username);
    }

    public List<User> getAllUser(){
        return userMapper.selectAll();
    }


    public boolean addUser(User user) {
        Example example = new Example(User.class);
        Example.Criteria criteria = example.createCriteria();
        criteria.andEqualTo("email", user.getEmail());

        List<User> userList = userMapper.selectByExample(example);
        if(userList.size() > 0)
            throw new BusinessException(ResponseCode.EMAIL_ALREADY_EXISTED);

        userMapper.insert(user);


        return true;
    }

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

    public boolean editUser(User user) {
        Example example = new Example(User.class);
        Example.Criteria criteria = example.createCriteria();
        criteria.andEqualTo("email", user.getEmail());

        List<User> userList = userMapper.selectByExample(example);
        if(userList.size() < 1)
            throw new BusinessException(ResponseCode.EMAIL_IS_NOT_EXISTED);
        user.setId(userList.get(0).getId());
        user.setPassword(userList.get(0).getPassword());

        userMapper.updateByPrimaryKey(user);

        return true;
    }

    public boolean deleteUser(User user) {
        Example example = new Example(User.class);
        Example.Criteria criteria = example.createCriteria();
        criteria.andEqualTo("email", user.getEmail());

        List<User> userList = userMapper.selectByExample(example);
        if(userList.size() < 1)
            throw new BusinessException(ResponseCode.EMAIL_IS_NOT_EXISTED);

        userMapper.deleteByExample(example);

        return true;
    }

    public User checkToken(String email, String token){

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
