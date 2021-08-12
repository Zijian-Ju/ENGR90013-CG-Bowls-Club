package com.cg.backend;

import com.cg.backend.controller.PlayerController;
import com.cg.backend.service.PlayerService;

import javax.annotation.Resource;

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

  @Test
  public void testDeletePlayerById(){
    this.playerController.deletePlayerById(100L);
  }



}
