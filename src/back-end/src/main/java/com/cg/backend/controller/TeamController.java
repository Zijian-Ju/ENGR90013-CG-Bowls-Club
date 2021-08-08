package com.cg.backend.controller;

import com.cg.backend.common.enums.ResponseCode;
import com.cg.backend.common.exceptions.BusinessException;
import com.cg.backend.common.utils.Paging;
import com.cg.backend.common.utils.SearchRequest;
import com.cg.backend.model.Player;
import com.cg.backend.model.PlayerFilter;
import com.cg.backend.model.Team;
import com.cg.backend.service.PlayerService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;

import com.cg.backend.service.TeamService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.support.PagedListHolder;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@EnableAutoConfiguration
@Slf4j
public class TeamController {
    @Resource
    private TeamService teamService;

    @RequestMapping(value="/team/addTeam", method= RequestMethod.POST, produces="application/json")
    public boolean addPlayer(@RequestBody Team team){
        this.teamService.addTeam(team);
        return true;
    }

    @RequestMapping(value="/team/updateTeam", method= RequestMethod.POST, produces="application/json")
    public boolean updatePlayer(@RequestBody Team team){
        this.teamService.updateTeam(team);
        return true;
    }

    @RequestMapping(value="/team/deleteTeam", method= RequestMethod.POST, produces="application/json")
    public boolean deletePlayerById(@RequestBody Team team){
        this.teamService.deleteTeam(team);
        return true;
    }
    @RequestMapping(value="/team/gerAllTeam", method= RequestMethod.GET, produces="application/json")
    public Map<String, Object> deletePlayerById(){
        Map<String, Object> resultMap = new HashMap<>();
        List<Team> teamList = this.teamService.getAllTeams();
        resultMap.put("teamList", teamList);
        return resultMap;
    }
    @RequestMapping(value="/team/getTeam", method= RequestMethod.POST, produces="application/json")
    public Team getTeamById(@RequestBody Team team){
        return this.teamService.getTeam(team);
    }
}
