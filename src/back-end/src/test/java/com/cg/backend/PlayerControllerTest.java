package com.cg.backend;

import com.cg.backend.common.exceptions.BusinessException;
import com.cg.backend.common.utils.SearchRequest;
import com.cg.backend.controller.PlayerController;
import com.cg.backend.dao.PlayerMapper;
import com.cg.backend.model.Order;
import com.cg.backend.model.Player;
import com.cg.backend.model.PlayerFilter;
import com.cg.backend.model.Team;
import com.cg.backend.service.PlayerService;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.Resource;
import net.bytebuddy.implementation.bytecode.Throw;
import org.junit.Before;
import org.junit.jupiter.api.BeforeAll;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest
public class PlayerControllerTest {
//  @Resource
//  PlayerMapper playerMapper;
  @Resource
  PlayerService playerService;
  @Resource
  PlayerController playerController;
  @Resource
  PlayerMapper playerMapper;

//  @Test
//  public void testUpdatePlayer(){
//    Player player = new Player((long) 1, "James Rumbold", "jamesR@gmail.com",
//        "male", "0412345678", "Mon,Sun",
//        "lead", "John", "");
//    playerController.updatePlayer(player);
//  }

//  @Test(expected = BusinessException.class)
//  public void testUpdatePlayerNotExist(){
//    Player player = new Player((long) 101, "James Rumbold", "jamesR@gmail.com",
//        "male", "0412345678", "Mon,Sun",
//        "lead", "John", "");
//    playerController.updatePlayer(player);
//  }

//  @Test
//  public void testAddPlayer(){
//    Player player = new Player((long) 100, "James Rumbold", "jamesR@gmail.com",
//        "male", "0412345678", "Mon,Sun",
//        "lead", "John", "");
//    playerController.insertPlayer(player);
//  }
//
//  @Test
//  public void testGetAllPlayer(){
//    this.playerService.getPlayersByFilter();
//  }


//  @Test
//  public void testDeletePlayerById(){
//    this.playerController.deletePlayerById(100L);
//  }

  /**
   * Unit Test for Sprint 2
   */
  // Test get all players return all the players
  @Test
  public void testGetAllPlayers() {
    List<Player> playerList = playerService.getPlayersByFilter(null);
    int totalPlayers = playerMapper.selectAll().size();
    assertEquals(totalPlayers, playerList.size());
  }

  // Test the filter functions
  // Filter the players by availability/performance/preferred positions respectively
  @Test
  public void testGetPlayerFilterByAvailability() {
    // Test filter by availability
    PlayerFilter filter = new PlayerFilter();
    List<String> availabilities = new ArrayList<>();
    availabilities.add("Friday");
    availabilities.add("Tuesday");
    filter.setAvailability(availabilities);
    List<Player> playerList = playerService.getPlayersByFilter(filter);

    int incorrect = 0;
    for (int i = 0; i < playerList.size();i++) {
      String[] avs = playerList.get(i).getPlayerAvailability().split("|");
      for (int j = 0;j < avs.length;j++) {
        if (!avs[i].equals("Tuesday") && avs.equals("Friday")) {
          incorrect++;
        }
      }
    }
    assertEquals(0, incorrect);


  }

  public void testGetPlayerFilterByPerformance() {
    // Test filter by performance score
    PlayerFilter filter = new PlayerFilter();
    filter.setMaxScore(8);
    filter.setMinScore(4);
    List<Player>playerList = playerService.getPlayersByFilter(filter);

    int incorrect = 0;
    for (int i = 0; i < playerList.size();i++) {
      if (playerList.get(i).getRecentPerformance() > 8 || playerList.get(i).getRecentPerformance() < 4) {
        incorrect ++;
      }
    }
    assertEquals(0, incorrect);
  }
  // Test filter by positions
  public void testGetPlayerFilterByPosition() {
    PlayerFilter filter = new PlayerFilter();
    List<String> positions = new ArrayList<>();
    positions.add("Skip");
    positions.add("Lead");
    filter.setPosition(positions);
    List<Player> playerList = playerService.getPlayersByFilter(filter);

    int incorrect = 0;
    for (int i = 0; i < playerList.size();i++) {
      String[] avs = playerList.get(i).getPlayerPosPreference().split("|");
      for (int j = 0;j < avs.length;j++) {
        if (!avs[i].equals("Lead") && avs.equals("Skip")) {
          incorrect++;
        }
      }
    }
    assertEquals(0, incorrect);
  }

  // Test sorting player function
  @Test
  public void testSortPlayersByPerformance() {
    PlayerFilter filter = new PlayerFilter();
    Order order = new Order();
    order.setSortField("RecentPerformance");
    order.setSortField("asc");
    filter.setOrder(order);
    List<Player> playerList = playerService.getPlayersByFilter(filter);

    int incorrect = 0;
    for (int i = 0; i < playerList.size() - 1;i++) {
      if (playerList.get(i).getRecentPerformance() > playerList.get(i + 1).getRecentPerformance()) {
        incorrect++;
      }
    }
    assertEquals(0, incorrect);
  }

}
