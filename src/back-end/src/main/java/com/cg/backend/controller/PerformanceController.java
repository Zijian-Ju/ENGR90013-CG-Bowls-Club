package com.cg.backend.controller;


import com.cg.backend.common.enums.ResponseCode;
import com.cg.backend.common.exceptions.BusinessException;
import com.cg.backend.common.utils.Paging;
import com.cg.backend.common.utils.SearchRequest;
import com.cg.backend.model.Performance;
import com.cg.backend.service.PerformanceService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.*;

@RestController
@EnableAutoConfiguration
@Slf4j
public class PerformanceController {
    @Resource
    private PerformanceService performanceService;

    @RequestMapping(value="/player/getUserPerformances", method= RequestMethod.POST, produces="application/json")
    public Map<String, Object> getUserPerformances(@RequestBody SearchRequest<Map<String, String>> searching){
        Map<String, Object> resultMap = new HashMap<>();

        Paging paging = searching.getPaging();
        Map<String, String> params = searching.getSearching();
        String playerId = params.get("playerId");

        if (playerId == null ) {
            throw new BusinessException(ResponseCode.PARAM_IS_INVALID);
        }
        List<Performance> performanceList  = performanceService.getAllUserPerformance(playerId, paging);

        resultMap.put("performanceList", performanceList);
        resultMap.put("Paging", paging);


        return resultMap;
    }

    @RequestMapping(value="/player/updateMatchPerformance", method= RequestMethod.POST, produces="application/json")
    public void updateUserPerformance(@RequestBody Performance performance){
        Map<String, Object> resultMap = new HashMap<>();

        if (performance.getMatchId() == null || performance.getPlayerId() == null || performance.getPerformanceScore() == null) {
            throw new BusinessException(ResponseCode.PARAM_IS_INVALID);
        }

        if (!performanceService.isPerformanceExist(performance)) {
            throw new BusinessException(ResponseCode.PERFORMANCE_RECORD_NOT_FOUND);
        }

        performanceService.updateUserPerformance(performance);
    }
}

