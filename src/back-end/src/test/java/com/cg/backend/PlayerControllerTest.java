package com.cg.backend;

import com.cg.backend.common.exceptions.BusinessException;
import com.cg.backend.controller.PlayerController;
import com.cg.backend.dao.PlayerMapper;
import com.cg.backend.model.Player;
import com.cg.backend.service.PlayerService;
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

@RunWith(SpringRunner.class)
@SpringBootTest
public class PlayerControllerTest {
//  @Resource
//  PlayerMapper playerMapper;
  @Resource
  PlayerService playerService;
  @Resource
  PlayerController playerController;

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

//  @Test
//  public void testGetAllPlayer(){
//    this.playerService.selectAll();
//  }

  @Test
  public void testDeletePlayerById(){
    this.playerController.deletePlayerById(100L);
  }



}
