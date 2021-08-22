package com.cg.backend.controller;


import com.cg.backend.common.enums.ResponseCode;
import com.cg.backend.common.exceptions.BusinessException;
import com.cg.backend.common.utils.Paging;
import com.cg.backend.common.utils.SearchRequest;
import com.cg.backend.model.Performance;
import com.cg.backend.model.Player;
import com.cg.backend.service.PerformanceService;
import com.cg.backend.service.PlayerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.*;

@RestController
@EnableAutoConfiguration
@Slf4j
public class PerformanceController {
    @Resource
    private PerformanceService performanceService;
    @Resource
    private PlayerService playerService;

    @RequestMapping(value = "/player/getUserPerformances", method = RequestMethod.POST, produces = "application/json")
    public Map<String, Object> getUserPerformances(@RequestBody SearchRequest<Map<String, String>> searching) {
        Map<String, Object> resultMap = new HashMap<>();

        Paging paging = searching.getPaging();
        Map<String, String> params = searching.getSearching();

        if (params == null || paging == null) {
            throw new BusinessException(ResponseCode.PARAM_IS_INVALID);
        }

        String playerId = params.get("playerId");

        if (playerId == null) {
            throw new BusinessException(ResponseCode.PARAM_IS_INVALID);
        }
        List<Performance> performanceList = performanceService.getAllUserPerformance(playerId, paging);

        resultMap.put("performanceList", performanceList);
        resultMap.put("Paging", paging);


        return resultMap;
    }

    @RequestMapping(value = "/player/getUserPerformancesByFilter", method = RequestMethod.POST, produces = "application/json")
    public Map<String, Object> getUserPerformancesByFilter(@RequestBody SearchRequest<Map<String, String>> searching) {
        Map<String, Object> resultMap = new HashMap<>();
        Map<String, String> params = searching.getSearching();
        String playerId = params.get("playerId");
        String season = params.get("season");
        String competitionId = params.get("competitionId");

        if (playerId == null) {
            throw new BusinessException(ResponseCode.PARAM_IS_INVALID);
        }
        List<Performance> performanceList = performanceService.getAllUserPerformanceByFilter(playerId, season, competitionId);
        if(performanceList.size()>10){
            performanceList=performanceList.subList(0,10);
        }
        resultMap.put("performanceList", performanceList);
        return resultMap;
    }

    @RequestMapping(value = "/player/updateMatchPerformance", method = RequestMethod.POST, produces = "application/json")
    public void updateUserPerformance(@RequestBody Performance performance) {
        if (!performanceService.isPerformanceExist(performance)) {
            throw new BusinessException(ResponseCode.PERFORMANCE_RECORD_NOT_FOUND);
        }
        synchronized (this) {
            performanceService.updateUserPerformance(performance);
            Paging paging = new Paging();
            paging.setCurrentPage(1);
            paging.setPageSize(Integer.MAX_VALUE);
            paging.setTotal(5);
            List<Performance> performanceList = performanceService.getAllUserPerformance(performance.getPlayerId().toString(), paging);
            if(performanceList.size()>5){
                performanceList=performanceList.subList(0,5);
            }
            Double recentScore = 0D;
            for (Performance performance1 : performanceList) {
                recentScore += performance1.getPerformanceScore();
            }
            recentScore = (Math.round((recentScore / performanceList.size()) * 100) / 100.0);
            Player player = new Player();
            player.setId(performance.getPlayerId());
            player = playerService.selectPlayerById(player);
            player.setRecentPerformance(recentScore);
            playerService.updatePlayer(player);
        }
    }

    @RequestMapping(value = "/player/addMatchPerformance", method = RequestMethod.POST, produces = "application/json")
    public void addUserPerformance(@RequestBody Performance performance) {
        synchronized (this) {
            performanceService.addUserPerformance(performance);
            Paging paging = new Paging();
            paging.setCurrentPage(1);
            paging.setPageSize(Integer.MAX_VALUE);
            paging.setTotal(5);
            List<Performance> performanceList = performanceService.getAllUserPerformance(performance.getPlayerId().toString(), paging);
            if(performanceList.size()>5){
                performanceList=performanceList.subList(0,5);
            }
            Double recentScore = 0D;
            for (Performance performance1 : performanceList) {
                recentScore += performance1.getPerformanceScore();
            }
            recentScore = (Math.round((recentScore / performanceList.size()) * 100) / 100.0);
            Player player = new Player();
            player.setId(performance.getPlayerId());
            player = playerService.selectPlayerById(player);
            player.setRecentPerformance(recentScore);
            playerService.updatePlayer(player);
        }

    }

    @RequestMapping(value = "/player/deleteMatchPerformanceById", method = RequestMethod.POST, produces = "application/json")
    public void deleteMatchPerformanceById(@RequestBody Performance performance) {

        if (!performanceService.isPerformanceExist(performance)) {
            throw new BusinessException(ResponseCode.PERFORMANCE_RECORD_NOT_FOUND);
        }

        synchronized (this) {
            performanceService.deleteUserPerformance(performance);
            Paging paging = new Paging();
            paging.setCurrentPage(1);
            paging.setPageSize(Integer.MAX_VALUE);
            paging.setTotal(5);
            List<Performance> performanceList = performanceService.getAllUserPerformance(performance.getPlayerId().toString(), paging);
            if(performanceList.size()>5){
                performanceList=performanceList.subList(0,5);
            }
            Double recentScore = 0D;
            for (Performance performance1 : performanceList) {
                recentScore += performance1.getPerformanceScore();
            }
            recentScore = (Math.round((recentScore / performanceList.size()) * 100) / 100.0);
            Player player = new Player();
            player.setId(performance.getPlayerId());
            player = playerService.selectPlayerById(player);
            player.setRecentPerformance(recentScore);
            playerService.updatePlayer(player);
        }

    }
}

