package com.cg.backend.dao;

import com.cg.backend.model.Performance;

import java.util.List;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import tk.mybatis.mapper.common.Mapper;

public interface PerformanceMapper extends Mapper<Performance> {
    @Select("select * from t_bowl_game_player_performance where player_id=#{playerId} ")
    public List<Performance> getPerformanceByPlayerId(@Param("playerId")long playerId, @Param("limit")int limit, @Param("offset")int offset);

    @Select("select count(*) from t_bowl_game_player_performance where player_id=#{playerId}")
    public int getPlayerPerformanceCount(@Param("playerId")long playerId);

    @Update("update t_bowl_game_player_performance set performance_score=#{performanceScore} where player_id=#{playerId} and match_id=#{matchId}")
    public void updatePerformance(Performance performance);
}