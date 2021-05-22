package com.cg.backend.service;

import com.cg.backend.common.enums.ResponseCode;
import com.cg.backend.common.exceptions.BusinessException;
import com.cg.backend.common.utils.Paging;
import com.cg.backend.dao.PerformanceMapper;
import com.cg.backend.model.Performance;
import com.cg.backend.model.Player;
import com.cg.backend.model.User;
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
        int total = performanceMapper.getPlayerPerformanceCount(id);

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

        Example example = new Example(Performance.class);
        Example.Criteria criteria = example.createCriteria();
        criteria.andEqualTo("playerId", id);
        example.setOrderByClause("match_time desc");
        List<Performance> performancesList = performanceMapper.selectByExampleAndRowBounds(example, new RowBounds(offset, limit));

//        List<Performance> performancesList = performanceMapper.getPerformanceByPlayerId(id, limit, offset);
        return performancesList;
    }

    public void updateUserPerformance(String playerId, String matchId, int score) {

        Performance performance = new Performance();
        performance.setPlayerId(Long.parseLong(playerId));
        performance.setMatchId(Long.parseLong(matchId));
        performance.setPerformanceScore(score);

        performanceMapper.updateByPrimaryKey(performance);
    }

}
