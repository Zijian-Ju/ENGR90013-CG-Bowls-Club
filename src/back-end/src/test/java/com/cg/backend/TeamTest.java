package com.cg.backend;

import com.cg.backend.model.Player;
import com.cg.backend.model.Team;
import com.cg.backend.service.PlayerService;
import com.cg.backend.service.TeamService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.annotation.Resource;
import java.util.List;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TeamTest {
    @Resource
    TeamService teamService;
    @Resource
    PlayerService playerService;
    /**
     * Unit Test for Sprint 2
     */
    @Test
    public void TestTeamManagementFunction(){
        List<Player> playerList = playerService.getPlayersByFilter(null);
        Team newTeam = new Team();
        newTeam.setTeamName("Test Team");
        newTeam.setLeadBowlerId1(playerList.get(1).getId());
        newTeam.setSecondBowlerId1(playerList.get(2).getId());
        newTeam.setThirdBowlerId1(playerList.get(3).getId());
        newTeam.setSkipBowlerId1(playerList.get(4).getId());
        newTeam.setLeadBowlerName1(playerList.get(1).getPlayerName());
        newTeam.setSecondBowlerName1(playerList.get(2).getPlayerName());
        newTeam.setThirdBowlerName1(playerList.get(3).getPlayerName());
        newTeam.setSkipBowlerName1(playerList.get(4).getPlayerName());

        newTeam.setLeadBowlerId2(playerList.get(5).getId());
        newTeam.setSecondBowlerId2(playerList.get(6).getId());
        newTeam.setThirdBowlerId2(playerList.get(7).getId());
        newTeam.setSkipBowlerId2(playerList.get(8).getId());
        newTeam.setLeadBowlerName2(playerList.get(5).getPlayerName());
        newTeam.setSecondBowlerName2(playerList.get(6).getPlayerName());
        newTeam.setThirdBowlerName2(playerList.get(7).getPlayerName());
        newTeam.setSkipBowlerName2(playerList.get(8).getPlayerName());

        newTeam.setLeadBowlerId3(playerList.get(9).getId());
        newTeam.setSecondBowlerId3(playerList.get(10).getId());
        newTeam.setThirdBowlerId3(playerList.get(11).getId());
        newTeam.setSkipBowlerId3(playerList.get(12).getId());
        newTeam.setLeadBowlerName3(playerList.get(9).getPlayerName());
        newTeam.setSecondBowlerName3(playerList.get(10).getPlayerName());
        newTeam.setThirdBowlerName3(playerList.get(11).getPlayerName());
        newTeam.setSkipBowlerName3(playerList.get(12).getPlayerName());

        newTeam.setLeadBowlerId4(playerList.get(13).getId());
        newTeam.setSecondBowlerId4(playerList.get(14).getId());
        newTeam.setThirdBowlerId4(playerList.get(15).getId());
        newTeam.setSkipBowlerId4(playerList.get(16).getId());
        newTeam.setLeadBowlerName4(playerList.get(13).getPlayerName());
        newTeam.setSecondBowlerName4(playerList.get(14).getPlayerName());
        newTeam.setThirdBowlerName4(playerList.get(15).getPlayerName());
        newTeam.setSkipBowlerName4(playerList.get(16).getPlayerName());

        // Test ADD team
        teamService.addTeam(newTeam);

        List<Team> teams = teamService.getAllTeams();
        Team addedTeam = null;
        for (int i = 0; i< teams.size();i++) {
            if (teams.get(i).getTeamName().equals(newTeam.getTeamName())){
                addedTeam = teams.get(i);
                assertEquals(addedTeam.getLeadBowlerId1(), playerList.get(1).getId());
                break;
            }
        }
        if (addedTeam == null) {
            Assert.fail();
            return;
        }

        // Test Update Team
        addedTeam.setTeamName("New Name");
        teamService.updateTeam(addedTeam);
        Team newT = teamService.getTeam(addedTeam);
        if (newT == null) {
            Assert.fail();
        }
        Assert.assertEquals("New Name", newT.getTeamName());

        // Test Delete Team
        teamService.deleteTeam(newT);
        Team deleteT = teamService.getTeam(newT);
        Assert.assertEquals(null, deleteT);
    }
}
