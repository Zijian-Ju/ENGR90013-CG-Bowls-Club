package com.cg.backend.service;

import com.cg.backend.common.utils.Paging;
import com.cg.backend.dao.PerformanceMapper;
import com.cg.backend.model.Performance;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service("performanceService")
@Slf4j
public class PerformanceService {

    @Resource
    private PerformanceMapper performanceMapper;

    public List<Performance> getAllUserPerformance(String userId, Paging paging) {
        return performanceMapper.select(new Performance());
    }

}
