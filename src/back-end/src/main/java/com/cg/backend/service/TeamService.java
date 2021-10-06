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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("teamService")
@Slf4j
public class TeamService {
    @Resource
    private TeamMapper teamMapper;

    @Resource
    private PlayerMapper playerMapper;

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

    public Map<String, Object> getTeamPlayerPhotos(Team team) {
        if (team != null && team.getId() > 0) {
            Example example = new Example(Player.class);
            Example.Criteria criteria = example.createCriteria();
            criteria.orEqualTo("id", team.getLeadBowlerId1());
            criteria.orEqualTo("id", team.getLeadBowlerId2());
            criteria.orEqualTo("id", team.getLeadBowlerId3());
            criteria.orEqualTo("id", team.getLeadBowlerId4());
            criteria.orEqualTo("id", team.getSecondBowlerId1());
            criteria.orEqualTo("id", team.getSecondBowlerId2());
            criteria.orEqualTo("id", team.getSecondBowlerId3());
            criteria.orEqualTo("id", team.getSecondBowlerId4());
            criteria.orEqualTo("id", team.getThirdBowlerId1());
            criteria.orEqualTo("id", team.getThirdBowlerId2());
            criteria.orEqualTo("id", team.getThirdBowlerId3());
            criteria.orEqualTo("id", team.getThirdBowlerId4());
            criteria.orEqualTo("id", team.getSkipBowlerId1());
            criteria.orEqualTo("id", team.getSkipBowlerId2());
            criteria.orEqualTo("id", team.getSkipBowlerId3());
            criteria.orEqualTo("id", team.getSkipBowlerId4());
            List<Player> players = playerMapper.selectByExample(example);

            Map<String, Object> resultMap = new HashMap<>();
            for(int i = 0;i < players.size();i++) {
                resultMap.put(Long.toString(players.get(i).getId()), players.get(i).getPhotoUrl());
            }
            return resultMap;
        }
        return null;
    }

}
