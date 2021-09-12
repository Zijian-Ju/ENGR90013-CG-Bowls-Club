package com.cg.backend.service;

import com.cg.backend.common.enums.ResponseCode;
import com.cg.backend.common.exceptions.BusinessException;
import com.cg.backend.dao.APIPermissionMapper;
import com.cg.backend.model.APIPermission;
import com.cg.backend.model.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import tk.mybatis.mapper.entity.Example;

import javax.annotation.Resource;
import java.security.Permission;
import java.util.List;

@Service("permissionService")
@Slf4j
public class PermissionService {

    @Resource
    private APIPermissionMapper permissionMapper;
    public final static String ADMIN_ROLE = "admin";
    public final static String GUEST = "guest";




    public boolean checkPermission(String uri, User user) {

        Example example = new Example(APIPermission.class);
        Example.Criteria criteria = example.createCriteria();
        // check uri
        criteria.andEqualTo("uri", uri);
        List<APIPermission> permissionList = permissionMapper.selectByExample(example);

        if (permissionList.size() < 1)
            return true;

        if (user == null)
            throw new BusinessException(ResponseCode.PERMISSION_DENIED);

        APIPermission permission = permissionList.get(0);
        if (permission.getRole().equals(ADMIN_ROLE)) {
            return true;
        }
        if (!permission.getRole().contains(user.getRole()))
            throw new BusinessException(ResponseCode.PERMISSION_DENIED);

        return true;
    }

    public APIPermission getRequiredPermission(String uri) {
        Example example = new Example(APIPermission.class);
        Example.Criteria criteria = example.createCriteria();
        // check uri
        criteria.andEqualTo("uri", uri);
        List<APIPermission> permissionList = permissionMapper.selectByExample(example);

        if (permissionList.size() < 1)
            return null;
        return permissionList.get(0);
    }
}
