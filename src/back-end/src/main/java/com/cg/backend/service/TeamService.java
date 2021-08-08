package com.cg.backend.service;
import com.cg.backend.common.enums.ResponseCode;
import com.cg.backend.common.exceptions.BusinessException;
import com.cg.backend.dao.PlayerMapper;
import com.cg.backend.dao.TeamMapper;
import com.cg.backend.model.Player;
import com.cg.backend.model.Team;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.session.RowBounds;
import com.cg.backend.dao.UserMapper;
import com.cg.backend.model.User;
import org.springframework.stereotype.Service;
import tk.mybatis.mapper.entity.Example;

import javax.annotation.Resource;
import java.util.List;

@Service("teamService")
@Slf4j
public class TeamService {
    @Resource
    private TeamMapper teamMapper;

    public void addTeam(Team team) {
        this.teamMapper.insert(team);
    }

    public void updateTeam(Team team) {
        Team t = this.teamMapper.selectByPrimaryKey(team);
        if(t == null){
            throw new BusinessException(ResponseCode.TEAM_RECORD_NOT_FOUND);
        }
        this.teamMapper.updateByPrimaryKey(team);
    }

    public void deleteTeam(Team team) {
        this.teamMapper.deleteByPrimaryKey(team);
    }


    public List<Team> getAllTeams() {
        return teamMapper.selectAll();
    }

    public Team getTeam(Team team) {
        return this.teamMapper.selectByPrimaryKey(team);
    }
}
