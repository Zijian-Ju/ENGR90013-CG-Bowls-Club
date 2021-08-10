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
            offset  = (paging.getCurrentPage() - 1) * paging.getPageSize();
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

    public void updateUserPerformance(Performance performance) {
        Performance updatingPerformance = new Performance();
        updatingPerformance.setCompetitionId(performance.getCompetitionId());
        updatingPerformance.setPlayerId(performance.getPlayerId());

        updatingPerformance.setPerformanceScore(performance.getPerformanceScore());

        performanceMapper.updateByPrimaryKey(performance);
    }

    // Check whether this performance record exists
    public boolean isPerformanceExist(Performance performance) {
        Example example = new Example(Performance.class);
        Example.Criteria criteria = example.createCriteria();
        criteria.andEqualTo("playerId", performance.getPlayerId());
        criteria.andEqualTo("competitionId", performance.getCompetitionId());

        Performance savedPerformance = performanceMapper.selectOneByExample(example);
        if (savedPerformance == null) {
            return false;
        }
        return true;
    }
}
