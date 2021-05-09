package com.cg.backend.controller;

import com.cg.backend.common.utils.Paging;
import com.cg.backend.common.utils.SearchRequest;
import com.cg.backend.model.Player;
import com.cg.backend.service.PlayerService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
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
public class PlayerController {

  @Resource
  private PlayerService playerService;

  @RequestMapping(value="/player/getAllUser", method= RequestMethod.POST, produces="application/json")
  public Map<String, Object> getAllUser(@RequestBody Paging paging){
    Map<String, Object> resultMap = new HashMap<>();
    List<Player> playerList = this.playerService.selectAll();
    resultMap.put("playerList", playerList);
    resultMap.put("Paging", paging);

    return resultMap;
  }

  @RequestMapping(value="/player/updatePlayer", method= RequestMethod.POST, produces="application/json")
  public boolean updatePlayer(@RequestBody Player player){
    this.playerService.updatePlayer(player);
    return true;
  }

}
