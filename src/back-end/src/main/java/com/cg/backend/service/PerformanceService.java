package com.cg.backend.service;

import com.cg.backend.common.utils.Paging;
import com.cg.backend.dao.PerformanceMapper;
import com.cg.backend.model.Performance;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

import tk.mybatis.mapper.entity.Example;

@Service("performanceService")
@Slf4j
public class PerformanceService {
    // Assume a player won't play over 10000 games
    public final int MAX_PAGE_SIZE = 10000;
    public static final int MAX_PERFORMANCE_SCORE = 10;
    public static final int MIN_PERFORMANCE_SCORE = 0;

    @Resource
    private PerformanceMapper performanceMapper;

    public List<Performance> getAllUserPerformance(String playerId, Paging paging) {
        long id = Long.parseLong(playerId);
        // Get total number of user performances for paging usage
        Example example = new Example(Performance.class);
        Example.Criteria criteria = example.createCriteria();
        criteria.andEqualTo("playerId", id);

        int total = performanceMapper.selectCountByExample(example);

        paging.setTotal(total);

        int offset = 0;
        int limit = MAX_PAGE_SIZE;

        // Identify real offset and limit
        if (paging.getCurrentPage() > 0) {
            offset = (paging.getCurrentPage() - 1) * paging.getPageSize();
            limit = paging.getPageSize();

            // Prevent invalid paging number
            if (offset > total) {
                offset = 0;
            }
        }


        example.setOrderByClause("match_time desc");
        List<Performance> performancesList = performanceMapper.selectByExampleAndRowBounds(example, new RowBounds(offset, limit));

        return performancesList;
    }

    public List<Performance> getAllUserPerformanceByFilter(String playerId, String season, String competitionId) {
        long id = Long.parseLong(playerId);
        long competitionIdLong = Long.parseLong(competitionId);
        // Get total number of user performances for paging usage
        Example example = new Example(Performance.class);
        Example.Criteria criteria = example.createCriteria();
        criteria.andEqualTo("playerId", id);
        criteria.andEqualTo("season", season);
        criteria.andEqualTo("competitionId", competitionIdLong);
        example.setOrderByClause("match_time desc");

        return performanceMapper.selectByExample(example);
    }

    public void updateUserPerformance(Performance performance) {
        Performance updatingPerformance = new Performance();
        updatingPerformance.setCompetitionId(performance.getCompetitionId());
        updatingPerformance.setPlayerId(performance.getPlayerId());
        updatingPerformance.setPerformanceScore(performance.getPerformanceScore());
        performanceMapper.updateByPrimaryKey(performance);
    }

    public void addUserPerformance(Performance performance) {
        performanceMapper.insert(performance);
    }

    public void deleteUserPerformance(Performance performance) {
        performanceMapper.deleteByPrimaryKey(performance);
    }

    // Check whether this performance record exists
    public boolean isPerformanceExist(Performance performance) {
        Example example = new Example(Performance.class);
        Example.Criteria criteria = example.createCriteria();
        criteria.andEqualTo("playerId", performance.getPlayerId());
        criteria.andEqualTo("competitionId", performance.getCompetitionId());
        criteria.andEqualTo("id", performance.getId());
        Performance savedPerformance = performanceMapper.selectOneByExample(example);
        if (savedPerformance == null) {
            return false;
        }
        return true;
    }
}
