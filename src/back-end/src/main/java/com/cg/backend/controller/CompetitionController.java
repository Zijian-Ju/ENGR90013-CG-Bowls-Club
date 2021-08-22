package com.cg.backend.controller;


import com.cg.backend.common.enums.ResponseCode;
import com.cg.backend.common.exceptions.BusinessException;
import com.cg.backend.model.Competition;
import com.cg.backend.model.CompetitionVO;
import com.cg.backend.model.Performance;
import com.cg.backend.model.Team;
import com.cg.backend.service.CompetitionService;
import com.cg.backend.service.PerformanceService;
import com.cg.backend.service.PlayerService;
import com.cg.backend.service.TeamService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.*;

@RestController
@EnableAutoConfiguration
@Slf4j
public class CompetitionController {
    @Resource
    private CompetitionService competitionService;

    @RequestMapping(value = "/competition/addCompetition", method = RequestMethod.POST, produces = "application/json")
    public boolean addCompetition(@RequestBody CompetitionVO competitionVO) {
        Competition competition = new Competition();
        BeanUtils.copyProperties(competitionVO, competition);
        if (!CollectionUtils.isEmpty(competitionVO.getCompetitionDays())) {
            competition.setCompetitionDay(String.join("|", competitionVO.getCompetitionDays()));
        }
        if (competition.getTeamId() == null || competition.getCompetitionDay() == null
                || competition.getCompetitionName() == null) {
            throw new BusinessException(ResponseCode.PARAM_IS_INVALID);
        }
        if (competition.getId() != null) {
            throw new BusinessException(ResponseCode.PARAM_IS_INVALID);
        }
        competitionService.addCompetition(competition);
        return true;
    }

    @RequestMapping(value = "/competition/getAllCompetition", method = RequestMethod.POST, produces = "application/json")
    public Map<String, Object> getAllCompetition() {
        Map<String, Object> resultMap = new HashMap<>();
        List<Competition> competitionList = competitionService.getAllCompetition();
        List<CompetitionVO> competitionVOList = new ArrayList<>();
        if (!CollectionUtils.isEmpty(competitionList)) {
            for (Competition competition : competitionList) {
                CompetitionVO competitionVO = new CompetitionVO();
                BeanUtils.copyProperties(competition, competitionVO);
                competitionVO.setCompetitionDay(Arrays.asList(competition.getCompetitionDay().split("\\|")));
                competitionVOList.add(competitionVO);
            }

        }
        resultMap.put("competitionList", competitionVOList);
        return resultMap;
    }

    @RequestMapping(value = "/competition/updateCompetition", method = RequestMethod.POST, produces = "application/json")
    public boolean updateCompetition(@RequestBody CompetitionVO competitionVO) {
        Competition competition = new Competition();
        BeanUtils.copyProperties(competitionVO, competition);
        if (!CollectionUtils.isEmpty(competitionVO.getCompetitionDays())) {
            competition.setCompetitionDay(String.join("|", competitionVO.getCompetitionDays()));
        }
        if (competition.getTeamId() == null || competition.getCompetitionDay() == null
                || competition.getCompetitionName() == null) {
            throw new BusinessException(ResponseCode.PARAM_IS_INVALID);
        }
        if (competition.getId() == null) {
            throw new BusinessException(ResponseCode.PARAM_IS_INVALID);
        }
        competitionService.updateCompetition(competition);
        return true;
    }

    @RequestMapping(value = "/competition/getCompetitionById", method = RequestMethod.POST, produces = "application/json")
    public CompetitionVO getCompetitionById(@RequestBody CompetitionVO competitionVO) {
        Competition competition = new Competition();
        BeanUtils.copyProperties(competitionVO, competition);
        if (competitionVO.getId() == null) {
            throw new BusinessException(ResponseCode.PARAM_IS_INVALID);
        }
        competition.setCompetitionDay(String.join("|", competitionVO.getCompetitionDays()));
        CompetitionVO competitionReturn = new CompetitionVO();
        competition = competitionService.getCompetitionById(competition);
        BeanUtils.copyProperties(competition, competitionReturn);
        competitionReturn.setCompetitionDay(Arrays.asList(competition.getCompetitionDay().split("\\|")));
        return competitionReturn;
    }

    @RequestMapping(value = "/competition/deleteCompetitionById", method = RequestMethod.POST, produces = "application/json")
    public boolean deleteCompetitionById(@RequestBody CompetitionVO competitionVO) {
        Competition competition = new Competition();
        BeanUtils.copyProperties(competitionVO, competition);
        if (!CollectionUtils.isEmpty(competitionVO.getCompetitionDays())) {
            competition.setCompetitionDay(String.join("|", competitionVO.getCompetitionDays()));
        }
        if (competition.getId() == null) {
            throw new BusinessException(ResponseCode.PARAM_IS_INVALID);
        }
        competitionService.deleteCompetitionById(competition);
        return true;
    }
}

