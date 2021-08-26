package com.cg.backend;

import com.cg.backend.common.utils.Paging;
import com.cg.backend.common.utils.SearchRequest;
import com.cg.backend.controller.CompetitionController;
import com.cg.backend.controller.PerformanceController;
import com.cg.backend.controller.PlayerController;
import com.cg.backend.dao.CompetitionMapper;
import com.cg.backend.dao.PerformanceMapper;
import com.cg.backend.dao.PlayerMapper;
import com.cg.backend.model.Competition;
import com.cg.backend.model.CompetitionVO;
import com.cg.backend.model.Performance;
import com.cg.backend.model.Player;
import com.cg.backend.service.CompetitionService;
import com.cg.backend.service.PerformanceService;
import com.cg.backend.service.PlayerService;

import javax.annotation.Resource;

import org.junit.Before;
import org.junit.jupiter.api.BeforeAll;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import tk.mybatis.mapper.entity.Example;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest
public class CompetitionControllerTest {
    @InjectMocks
    CompetitionController competitionController;
    @Mock
    CompetitionService competitionService;

    @Test
    public void TestAddCompetition() {
        CompetitionVO competitionVO = new CompetitionVO();
        List<String> days = new ArrayList<>();
        days.add("day");
        competitionVO.setCompetitionDay(days);
        try {
            competitionController.addCompetition(competitionVO);
            fail();
        } catch (Exception e) {

        }
        competitionVO.setId(100l);
        try {
            competitionController.addCompetition(competitionVO);
            fail();
        } catch (Exception e) {

        }
        competitionVO.setCompetitionName("name");
        competitionVO.setTeamId(1L);
        try {
            competitionController.addCompetition(competitionVO);
            fail();
        } catch (Exception e) {

        }
        competitionVO.setId(null);
        competitionController.addCompetition(competitionVO);
    }

    @Test
    public void TestGetAllCompetition() {
        List<Competition> competitionList = new ArrayList<>();
        Competition competition = new Competition();
        competition.setCompetitionName("name");
        competition.setTeamId(1L);
        List<String> days = new ArrayList<>();
        competition.setCompetitionDay("days");
        competitionList.add(competition);
        when(competitionService.getAllCompetition()).thenReturn(competitionList);
        competitionController.getAllCompetition();
    }


    @Test
    public void TestUpdateCompetition() {
        CompetitionVO competitionVO = new CompetitionVO();
        List<String> days = new ArrayList<>();
        days.add("day");
        competitionVO.setCompetitionDay(days);
        try {
            competitionController.updateCompetition(competitionVO);
            fail();
        } catch (Exception e) {

        }
        try {
            competitionController.updateCompetition(competitionVO);
            fail();
        } catch (Exception e) {

        }
        competitionVO.setCompetitionName("name");
        competitionVO.setTeamId(1L);
        try {
            competitionController.updateCompetition(competitionVO);
            fail();
        } catch (Exception e) {

        }
        competitionVO.setId(1L);
        competitionController.updateCompetition(competitionVO);
    }

    @Test
    public void TestGetCompetitionById() {
        CompetitionVO competitionVO = new CompetitionVO();
        List<String> days = new ArrayList<>();
        days.add("day");
        competitionVO.setCompetitionDay(days);
        Competition competition = new Competition();
        competition.setCompetitionDay("day");
        when(competitionService.getCompetitionById(any())).thenReturn(competition);
        try {
            competitionController.getCompetitionById(competitionVO);
            fail();
        } catch (Exception e) {

        }
        competitionVO.setId(1L);
        competitionController.getCompetitionById(competitionVO);
    }

    @Test
    public void TestDeleteCompetitionById() {
        CompetitionVO competitionVO = new CompetitionVO();
        List<String> days = new ArrayList<>();
        days.add("day");
        competitionVO.setCompetitionDay(days);
        try {
            competitionController.deleteCompetitionById(competitionVO);
            fail();
        } catch (Exception e) {

        }
        competitionVO.setId(1L);
        competitionController.deleteCompetitionById(competitionVO);
    }


}
