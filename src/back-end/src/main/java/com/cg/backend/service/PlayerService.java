package com.cg.backend.service;

import com.cg.backend.dao.PlayerMapper;
import com.cg.backend.model.Player;
import java.util.List;
import javax.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


@Service("playerService")
@Slf4j
public class PlayerService {

  @Resource
  private PlayerMapper playerMapper;

  public List<Player> selectAll() {
    return this.playerMapper.selectAll();
  }

  public void updatePlayer(Player player) {
    this.playerMapper.updateByPrimaryKey(player);
  }

  public void deletePlayerById(Player player) {
    this.playerMapper.deleteByPrimaryKey(player);
  }

  public void addPlayer(Player player) {
    this.playerMapper.insert(player);
  }
}
