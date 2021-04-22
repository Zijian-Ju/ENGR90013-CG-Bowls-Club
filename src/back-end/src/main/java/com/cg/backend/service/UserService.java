package com.cg.backend.service;


import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.session.RowBounds;
import com.cg.backend.dao.UserMapper;
import com.cg.backend.model.User;
import org.springframework.stereotype.Service;
import tk.mybatis.mapper.entity.Example;

import javax.annotation.Resource;
import java.util.List;

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



}
