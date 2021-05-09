package com.cg.backend.controller;


import com.cg.backend.common.utils.Paging;
import com.cg.backend.common.utils.SearchRequest;
import com.cg.backend.model.Performance;
import com.cg.backend.model.Player;
import com.cg.backend.service.PerformanceService;
import lombok.Data;
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
        List<Performance> performanceList = new ArrayList<>();

        Performance temp = new Performance();


        temp.setPlayerId(Long.parseLong(searching.getSearching().get("player_id")));
        temp.setMatchId(new Long(1));
        temp.setPerformanceScore(new Integer(10));
        temp.setMatchTime(new Date());

        performanceList.add(temp);

        resultMap.put("performanceList", performanceList);
        resultMap.put("Paging", searching.getPaging());

        return resultMap;
    }

    @RequestMapping(value="/player/updateMatchPerformance", method= RequestMethod.POST, produces="application/json")
    public Map<String, Object> updateUserPerformance(@RequestBody UpdateUserPerformanceRequest request){
        Map<String, Object> resultMap = new HashMap<>();
//        List<Player> performanceList = this.performanceService;
//        resultMap.put("performanceList", performanceList);
//        resultMap.put("Paging", paging);

        return resultMap;
    }

    @Data
    class UpdateUserPerformanceRequest {
        String playerId;
        String matchId;
        Integer score;
    }
}

