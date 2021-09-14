package com.cg.backend;

import com.cg.backend.controller.CompetitionController;
import com.cg.backend.controller.SSOController;
import com.cg.backend.model.Competition;
import com.cg.backend.model.CompetitionVO;
import com.cg.backend.model.User;
import com.cg.backend.service.CompetitionService;
import com.cg.backend.service.SSOService;
import com.cg.backend.service.UserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest
public class SSOControllerTest {
    @Resource
    SSOController ssoController;
    @Resource
    SSOService ssoService;

    // Test Add User
    @Test
    public void TestAddUser() {
        int userCount = ssoController.getAllUser().size();
        User user = new User();
        user.setUserName("TestUser");
        user.setEmail("TestUser");
        user.setPassword("123456");
        user.setRole("selector");
        ssoController.addUser(user);
        List<User> allUsers = ssoController.getAllUser();
        assertEquals(userCount + 1, allUsers.size());
    }

    // Test Delete User
    @Test
    public void TestDeleteUser() {
        List<User> prevUsers = ssoController.getAllUser();
        int countDelete = 0;
        for (int i = 0;i < prevUsers.size();i++) {
            if (prevUsers.get(i).getEmail().equals("TestUser")) {
                User deletedUser = new User();
                deletedUser.setId(prevUsers.get(i).getId());
                ssoController.deleteUser(deletedUser);
                countDelete ++;
            }
        }
        List<User> allUsers = ssoController.getAllUser();
        assertEquals(prevUsers.size() -countDelete, allUsers.size());
    }
}
