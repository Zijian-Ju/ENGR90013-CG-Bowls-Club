package com.cg.backend.service;

import com.cg.backend.common.enums.ResponseCode;
import com.cg.backend.common.exceptions.BusinessException;
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
}
