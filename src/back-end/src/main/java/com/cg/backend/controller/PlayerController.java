package com.cg.backend.controller;

import com.cg.backend.common.enums.ResponseCode;
import com.cg.backend.common.exceptions.BusinessException;
import com.cg.backend.common.utils.SearchRequest;
import com.cg.backend.model.Player;
import com.cg.backend.model.PlayerFilter;
import com.cg.backend.service.PlayerService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@EnableAutoConfiguration
@Slf4j
public class PlayerController {

  @Resource
  private PlayerService playerService;

  @RequestMapping(value="/player/getAllPlayer", method= RequestMethod.POST, produces="application/json")
  public Map<String, Object> getAllPlayer(@RequestBody SearchRequest<PlayerFilter> request){
    Map<String, Object> resultMap = new HashMap<>();
    List<Player> playerList = this.playerService.getPlayersByFilter(request.getSearching());
    resultMap.put("playerList", playerList);

    return resultMap;
  }

  @RequestMapping(value="/player/getPlayerById", method= RequestMethod.POST, produces="application/json")
  public Player getPlayerById(@RequestBody long id){
    Player player = new Player();
    player.setId(id);
    Player p = this.playerService.selectPlayerById(player);
    if(p == null)
      throw new BusinessException(ResponseCode.PLAYER_NOT_EXIST);

    return p;
  }

  @RequestMapping(value="/player/addPlayer", method= RequestMethod.POST, produces="application/json")
  public boolean addPlayer(@RequestBody Player player){
    this.playerService.insertPlayer(player);
    return true;
  }

  @RequestMapping(value="/player/updatePlayer", method= RequestMethod.POST, produces="application/json")
  public boolean updatePlayer(@RequestBody Player player){
    this.playerService.updatePlayer(player);
    return true;
  }

  @RequestMapping(value="/player/deletePlayerById", method= RequestMethod.POST, produces="application/json")
  public boolean deletePlayerById(@RequestBody Long playerId){
    Player player=new Player();
    player.setId(playerId);
    this.playerService.deletePlayerById(player);
    return true;
  }
  @RequestMapping(value="/player/insertPlayer", method= RequestMethod.POST, produces="application/json")
  public boolean insertPlayer(@RequestBody Player player){
    this.playerService.insertPlayer(player);
    return true;
  }
}
