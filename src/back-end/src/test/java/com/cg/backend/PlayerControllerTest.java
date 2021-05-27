package com.cg.backend;

import com.cg.backend.controller.PlayerController;
import com.cg.backend.dao.PlayerMapper;
import com.cg.backend.model.Player;
import com.cg.backend.service.PlayerService;
import java.util.List;
import javax.annotation.Resource;
import org.junit.Before;
import org.junit.jupiter.api.BeforeAll;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class PlayerControllerTest {
//  @Resource
//  PlayerMapper playerMapper;
  @Resource
  PlayerService playerService;
  @Resource
  PlayerController playerController;

  @Test
  public void updatePlayer(){
    Player player = new Player((long) 1, "James Rumbold", "jamesR@gmail.com",
        "male", "0412345678", "Mon,Sun",
        "lead", "John", "");
    playerController.updatePlayer(player);
  }

  @Test
  public void addPlayer(){
    Player player = new Player((long) 6, "James Rumbold", "jamesR@gmail.com",
        "male", "0412345678", "Mon,Sun",
        "lead", "John", "");
    playerController.updatePlayer(player);
  }

  @Test
  public void getAllPlayer(){
    this.playerService.selectAll();
  }


}
