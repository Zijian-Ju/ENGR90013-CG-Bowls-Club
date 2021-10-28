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

    public Map<String, Object> getTeamPlayerDetail(Team rawTeam) {
        Team team =  this.teamMapper.selectByPrimaryKey(rawTeam);
        if (team != null && team.getId() > 0) {
            Example example = new Example(Player.class);
            Example.Criteria criteria = example.createCriteria();
            if (team.getLeadBowlerId1() > 0) {
                criteria.orEqualTo("id", team.getLeadBowlerId1());
            }
            if (team.getLeadBowlerId2() > 0) {
                criteria.orEqualTo("id", team.getLeadBowlerId2());
            }
            if (team.getLeadBowlerId3() > 0) {
                criteria.orEqualTo("id", team.getLeadBowlerId3());
            }
            if (team.getLeadBowlerId4() > 0) {
                criteria.orEqualTo("id", team.getLeadBowlerId4());
            }

            if (team.getSecondBowlerId1() > 0) {
                criteria.orEqualTo("id", team.getSecondBowlerId1());
            }
            if (team.getSecondBowlerId2() > 0) {
                criteria.orEqualTo("id", team.getSecondBowlerId2());
            }
            if (team.getSecondBowlerId3() > 0) {
                criteria.orEqualTo("id", team.getSecondBowlerId3());
            }
            if (team.getSecondBowlerId4() > 0) {
                criteria.orEqualTo("id", team.getSecondBowlerId4());
            }

            if (team.getThirdBowlerId1() > 0) {
                criteria.orEqualTo("id", team.getThirdBowlerId1());
            }
            if (team.getThirdBowlerId2() > 0) {
                criteria.orEqualTo("id", team.getThirdBowlerId2());
            }
            if (team.getThirdBowlerId3() > 0) {
                criteria.orEqualTo("id", team.getThirdBowlerId3());
            }
            if (team.getThirdBowlerId4() > 0) {
                criteria.orEqualTo("id", team.getThirdBowlerId4());
            }

            if (team.getSkipBowlerId1() > 0) {
                criteria.orEqualTo("id", team.getSkipBowlerId1());
            }
            if (team.getSkipBowlerId2() > 0) {
                criteria.orEqualTo("id", team.getSkipBowlerId2());
            }
            if (team.getSkipBowlerId3() > 0) {
                criteria.orEqualTo("id", team.getSkipBowlerId3());
            }
            if (team.getSkipBowlerId4() > 0) {
                criteria.orEqualTo("id", team.getSkipBowlerId4());
            }
            List<Player> players = playerMapper.selectByExample(example);

            Map<Long, Player> playerMap = transferPlayerListToMap(players);

            Map<String, Object> resultMap = new HashMap<>();
            resultMap.put("teamName", team.getTeamName());
            resultMap.put("id", team.getId());

            resultMap.put("leadBowlerId1", playerMap.getOrDefault(team.getLeadBowlerId1(), null));
            resultMap.put("leadBowlerId2", playerMap.getOrDefault(team.getLeadBowlerId2(), null));
            resultMap.put("leadBowlerId3", playerMap.getOrDefault(team.getLeadBowlerId3(), null));
            resultMap.put("leadBowlerId4", playerMap.getOrDefault(team.getLeadBowlerId4(), null));
            resultMap.put("secondBowlerId1", playerMap.getOrDefault(team.getSecondBowlerId1(), null));
            resultMap.put("secondBowlerId2", playerMap.getOrDefault(team.getSecondBowlerId2(), null));
            resultMap.put("secondBowlerId3", playerMap.getOrDefault(team.getSecondBowlerId3(), null));
            resultMap.put("secondBowlerId4", playerMap.getOrDefault(team.getSecondBowlerId4(), null));
            resultMap.put("skipBowlerId1", playerMap.getOrDefault(team.getSkipBowlerId1(), null));
            resultMap.put("skipBowlerId2", playerMap.getOrDefault(team.getSkipBowlerId2(), null));
            resultMap.put("skipBowlerId3", playerMap.getOrDefault(team.getSkipBowlerId3(), null));
            resultMap.put("skipBowlerId4", playerMap.getOrDefault(team.getSkipBowlerId4(), null));
            resultMap.put("thirdBowlerId1", playerMap.getOrDefault(team.getThirdBowlerId1(), null));
            resultMap.put("thirdBowlerId2", playerMap.getOrDefault(team.getThirdBowlerId2(), null));
            resultMap.put("thirdBowlerId3", playerMap.getOrDefault(team.getThirdBowlerId3(), null));
            resultMap.put("thirdBowlerId4", playerMap.getOrDefault(team.getThirdBowlerId4(), null));
            return resultMap;
        }
        return null;
    }

    private Map<Long, Player> transferPlayerListToMap(List<Player> players) {
        Map<Long, Player> resultMap = new HashMap();
        for (int i = 0;i < players.size();i++) {
            if (players.get(i).getId() > 0) {
                resultMap.put(players.get(i).getId(), players.get(i));
            }
        }
        return resultMap;
    }
}
