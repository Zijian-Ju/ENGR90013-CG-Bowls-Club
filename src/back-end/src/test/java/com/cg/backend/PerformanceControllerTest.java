package com.cg.backend;

import com.cg.backend.common.utils.Paging;
import com.cg.backend.common.utils.SearchRequest;
import com.cg.backend.controller.PerformanceController;
import com.cg.backend.controller.PlayerController;
import com.cg.backend.dao.PerformanceMapper;
import com.cg.backend.dao.PlayerMapper;
import com.cg.backend.model.Performance;
import com.cg.backend.model.Player;
import com.cg.backend.service.PerformanceService;
import com.cg.backend.service.PlayerService;
import javax.annotation.Resource;
import org.junit.Before;
import org.junit.jupiter.api.BeforeAll;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import tk.mybatis.mapper.entity.Example;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class PerformanceControllerTest {
    @Resource
    PerformanceService performanceService;
    String existPlayerId = "1";

    @Resource
    PerformanceMapper performanceMapper;

    // Test when the player is existing in the system with fully acquiring performances
    @Test
    public void TestSuccessGetPerformances() {

        Paging paging = new Paging();
        // 0 indicates get full list of the player
        paging.setCurrentPage(0);
        paging.setPageSize(20);
        List<Performance>result = performanceService.getAllUserPerformance(existPlayerId, paging);
        // Player 1 is a fake player which has only one performance record
        assertEquals(result.size(), 1);
        // Guarantee the record is for the searching player
        assertEquals(result.get(0).getPlayerId(),new Long(1));
    }

    // Test when the player is existing in the system with page options
    @Test
    public void TestSuccessGetPerformancesWithPage() {

        Paging paging = new Paging();
        // 0 indicates get full list of the player
        paging.setCurrentPage(1);
        paging.setPageSize(20);
        List<Performance>result = performanceService.getAllUserPerformance(existPlayerId, paging);
        // Player 1 is a fake player
        assertEquals(result.size(), 1);
        // Guarantee the record is for the searching player
        assertEquals(result.get(0).getPlayerId(),new Long(1));
    }

    // Test when the player is existing in the system with over bound page options
    @Test
    public void TestGetPerformancesWithPageOverBound() {

        Paging paging = new Paging();
        // 0 indicates get full list of the player
        paging.setCurrentPage(2);
        paging.setPageSize(20);
        List<Performance>result = performanceService.getAllUserPerformance(existPlayerId, paging);
        // Player 1 is a fake player
        assertEquals(result.size(), 1);
        // Guarantee the record is for the searching player
        assertEquals(result.get(0).getPlayerId(),new Long(1));
    }

    // Test successfully update record when the performance record is existing in the system
    @Test
    public void TestSuccessUpdatePerformance() {
        // Player has played in match 1
        String matchId = "1";
        String playerId = "1";
        Performance performance = new Performance();
        performance.setPerformanceScore(3);
        performance.setCompetitionId(Long.parseLong(matchId));
        performance.setPlayerId(Long.parseLong(playerId));

        performanceService.updateUserPerformance(performance);

        Example example = new Example(Performance.class);
        Example.Criteria criteria = example.createCriteria();
        criteria.andEqualTo("playerId", performance.getPlayerId());
        criteria.andEqualTo("matchId", performance.getCompetitionId());
        performance = performanceMapper.selectOneByExample(example);

        // Check whether the updated record is the same as it should be
        assertEquals(performance.getPerformanceScore(), Integer.valueOf(3));
    }


    // Test check whether performance record existing -- exist
    @Test
    public void TestIsPerformanceExist_TRUE() {
        // Player has played in match 1
        String matchId = "1";
        String playerId = "1";
        Performance performance = new Performance();
        performance.setPerformanceScore(3);
        performance.setCompetitionId(Long.parseLong(matchId));
        performance.setPlayerId(Long.parseLong(playerId));


        boolean result = performanceService.isPerformanceExist(performance);

        assertTrue(result);
    }

    // Test check whether performance record existing -- not exist
    @Test
    public void TestIsPerformanceExist_FALSE() {
        // Player has played in match 1
        String matchId = "2";
        String playerId = "1";
        Performance performance = new Performance();
        performance.setPerformanceScore(3);
        performance.setCompetitionId(Long.parseLong(matchId));
        performance.setPlayerId(Long.parseLong(playerId));


        boolean result = performanceService.isPerformanceExist(performance);

        assertFalse(result);
    }


}
