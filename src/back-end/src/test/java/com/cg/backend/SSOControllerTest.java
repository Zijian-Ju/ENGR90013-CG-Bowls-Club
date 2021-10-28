package com.cg.backend;

import com.cg.backend.common.exceptions.BusinessException;
import com.cg.backend.controller.SSOController;
import com.cg.backend.dao.APIPermissionMapper;
import com.cg.backend.model.APIPermission;
import com.cg.backend.model.User;
import com.cg.backend.service.PermissionService;
import com.cg.backend.service.SSOService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.any;

@RunWith(SpringRunner.class)
@SpringBootTest
public class SSOControllerTest {
    @Resource
    SSOController ssoController;
    @Resource
    SSOService ssoService;
    @Resource
    APIPermissionMapper permissionMapper;
    @Resource
    PermissionService permissionService;
    // Test Delete User
    @Test
    public void testDeleteUser() {
        List<User> prevUsers = ssoController.getAllUser();
        int countDelete = 0;
        for (int i = 0;i < prevUsers.size();i++) {
            if (prevUsers.get(i).getEmail().equals("TestUser")) {
                ssoController.deleteUser(prevUsers.get(i));
                countDelete ++;
            }
        }
        List<User> allUsers = ssoController.getAllUser();
        assertEquals(prevUsers.size() -countDelete, allUsers.size());
    }

    // Test Add User
    @Test
    public void testAddUser() {
        int userCount = ssoController.getAllUser().size();
        User user = new User();
        user.setUserName("TestUser");
        user.setEmail("TestUser");
        user.setPassword("123456");
        user.setRole("selector");
        ssoController.addUser(user);
        List<User> allUsers = ssoController.getAllUser();
        assertEquals(userCount + 1, allUsers.size());

        for (int i = 0;i < allUsers.size();i++) {
            if (allUsers.get(i).getEmail().equals("TestUser")) {
                ssoController.deleteUser(allUsers.get(i));
            }
        }
    }


    @Test
    public void testAdminLogin() {
        String email = "admin";
        String password = "admin";
        User user = new User();
        user.setEmail(email);
        user.setPassword(password);
        Map<String, Object> result = ssoController.login(user);

        User returnedUser = (User) result.get("user");

        assertEquals(returnedUser.getRole(), PermissionService.ADMIN_ROLE);
    }
    @Test
    public void testSelectorLogin() {
        String email = "zijianj";
        String password = "123456";
        User user = new User();
        user.setEmail(email);
        user.setPassword(password);
        Map<String, Object> result = ssoController.login(user);

        User returnedUser = (User) result.get("user");

        assertEquals(returnedUser.getRole(), PermissionService.SELECTOR);
    }


    @Test
    public void testAdminCheckPermission(){
        String email = "admin";
        String password = "admin";
        User user = new User();
        user.setEmail(email);
        user.setPassword(password);
        Map<String, Object> result = ssoController.login(user);


        User returnedUser = (User) result.get("user");
        String token = (String) result.get("token");

        List<APIPermission> allUrl = permissionMapper.selectAll();
        for (int i = 0;i < allUrl.size();i++) {
            assertTrue(permissionService.checkPermission(allUrl.get(i).getUri(), returnedUser));
        }
    }

    @Test
    public void testSelectorCheckPermission(){
        String email = "zijianj";
        String password = "123456";
        User user = new User();
        user.setEmail(email);
        user.setPassword(password);
        Map<String, Object> result = ssoController.login(user);


        User returnedUser = (User) result.get("user");
        String token = (String) result.get("token");

        List<APIPermission> allUrl = permissionMapper.selectAll();
        for (int i = 0;i < allUrl.size();i++) {
            if (allUrl.get(i).getRole().equals("selector")) {
                assertTrue(permissionService.checkPermission(allUrl.get(i).getUri(), returnedUser));
            }else {
                assertFalse(permissionService.checkPermission(allUrl.get(i).getUri(), returnedUser));
            }
        }
    }
    @Test
    public void testGuestCheckPermission() {
        User user = new User();
        user.setRole("guest");
        List<APIPermission> allUrl = permissionMapper.selectAll();
        for (int i = 0;i < allUrl.size();i++) {
            assertFalse(permissionService.checkPermission(allUrl.get(i).getUri(), user));
        }
    }
}
