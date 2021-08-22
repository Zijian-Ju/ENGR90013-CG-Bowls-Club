package com.cg.backend.service;

import com.cg.backend.common.enums.ResponseCode;
import com.cg.backend.common.exceptions.BusinessException;
import com.cg.backend.dao.PlayerMapper;
import com.cg.backend.model.Order;
import com.cg.backend.model.Player;

import java.util.*;
import javax.annotation.Resource;

import com.cg.backend.model.PlayerFilter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


@Service("playerService")
@Slf4j
public class PlayerService {

  @Resource
  private PlayerMapper playerMapper;

  // Get all players by filtering conditions
  public List<Player> getPlayersByFilter(PlayerFilter filter) {
    List<Player> resultPlayers;

    // Select all the players in system first
    List<Player> allPlayers = this.playerMapper.selectAll();

    // Filter players
    if (filter != null) {
      resultPlayers = new ArrayList<>();
      for (int i = 0; i < allPlayers.size();i++) {
        Player player = allPlayers.get(i);
        if (matchFilterCondition(player, filter)) {
          resultPlayers.add(player);
        }
      }
      sortPlayers(resultPlayers, filter.getOrder());
    }else {
      resultPlayers = allPlayers;
    }

    return resultPlayers;
  }

  private void sortPlayers(List<Player> resultPlayers, Order order) {
    if (order.getSortField().equals("recentPerformance")) {
      sortByRecenetPerformance(resultPlayers, order);
    }
  }

  private void sortByRecenetPerformance(List<Player> resultPlayers, Order order) {
    if (order.getDirection().equals(Order.ASC_ORDER)) {
      Collections.sort(resultPlayers, new Comparator<Player>() {
        @Override
        public int compare(Player o1, Player o2) {
          return o1.getRecentPerformance().compareTo(o2.getRecentPerformance());
        }
      });
    }else if (order.getDirection().equals(Order.DESC_ORDER)) {
      Collections.sort(resultPlayers, new Comparator<Player>() {
        @Override
        public int compare(Player o1, Player o2) {
          return o2.getRecentPerformance().compareTo(o1.getRecentPerformance());
        }
      });
    }
  }


  public void updatePlayer(Player player) {
    Player p = this.playerMapper.selectByPrimaryKey(player);
    if(p == null){
      throw new BusinessException(ResponseCode.PLAYER_NOT_EXIST);
    }
    this.playerMapper.updateByPrimaryKey(player);
  }

  public void insertPlayer(Player player) {
    this.playerMapper.insert(player);
  }

  public void deletePlayerById(Player player) {
    this.playerMapper.deleteByPrimaryKey(player);
  }

  public Player selectPlayerById(Player player) {
    return this.playerMapper.selectByPrimaryKey(player);
  }

  public static boolean matchFilterCondition(Player player, PlayerFilter filter) {
    if (!matchScoreCondition(player, filter)){
      return false;
    }
    // Filter by availability
    if (!matchAvailabilityCondition(player, filter)) {
      return false;
    }

    // Filter by position
    if (!matchPositionCondition(player, filter)) {
      return false;
    }
    // Filter by position
    return true;
  }




  private static boolean matchPositionCondition(Player player, PlayerFilter filter) {
    if (filter.getPosition() != null && filter.getPosition().size() > 0) {
      // Store all required positions into a set
      Set<String> positions = transferArrayToSet(filter.getPosition());
      if (player.getPlayerPosPreference() == null || player.getPlayerPosPreference() == "") {
        return false;
      }

      String[] playerPositions = player.getPlayerPosPreference().split("\\|");
      if (playerPositions.length == 0) {
        return false;
      }
      for (int i = 0; i < playerPositions.length; i++) {
        // If the players availability matches any total availabilities, break the loop
        if (positions.contains(playerPositions[i])) {
          break;
        }
        // The last one does not match the conditions, return false
        if (i ==  playerPositions.length - 1) {
          return false;
        }
      }
    }
    return true;

  }
  private static boolean matchScoreCondition(Player player, PlayerFilter filter) {
    if (filter.getMinScore() > player.getRecentPerformance() || filter.getMaxScore() < player.getRecentPerformance()){
      return false;
    }
    return true;
  }
  private static boolean matchAvailabilityCondition(Player player, PlayerFilter filter) {
    if (filter.getAvailability() != null && filter.getAvailability().size() > 0) {
      // Store all required availability into a set
      Set<String> totalAvailability = transferArrayToSet(filter.getAvailability());
      if (player.getPlayerAvailability() == null || player.getPlayerAvailability() == "") {
        return false;
      }

      String[] availbilities = player.getPlayerAvailability().split("\\|");
      if (availbilities.length == 0) {
        return false;
      }
      for (int i = 0; i < availbilities.length; i++) {
        // If the players availability matches any total availabilities, break the loop
        if (totalAvailability.contains(availbilities[i])) {
          break;
        }
        // The last one does not match the conditions, return false
        if (i == availbilities.length - 1) {
          return false;
        }
      }
    }
    return true;
  }

  private static Set<String> transferArrayToSet(List<String> stringArray ) {
    Set<String> stringSet = new HashSet<>();
    for (int i = 0;i < stringArray.size();i++) {
      stringSet.add(stringArray.get(i));
    }
    return stringSet;
  }

}
