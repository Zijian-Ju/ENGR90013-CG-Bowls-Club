package com.cg.backend.model;

import java.util.Date;
import javax.persistence.*;

@Table(name = "t_bowl_game_player_performance")
public class Performance {
    @Column(name = "player_id")
    private Long playerId;

    @Column(name = "match_id")
    private Long matchId;

    @Column(name = "performance_score")
    private Integer performanceScore;

    @Column(name = "match_time")
    private Date matchTime;

    /**
     * @return player_id
     */
    public Long getPlayerId() {
        return playerId;
    }

    /**
     * @param playerId
     */
    public void setPlayerId(Long playerId) {
        this.playerId = playerId;
    }

    /**
     * @return match_id
     */
    public Long getMatchId() {
        return matchId;
    }

    /**
     * @param matchId
     */
    public void setMatchId(Long matchId) {
        this.matchId = matchId;
    }

    /**
     * @return performance_score
     */
    public Integer getPerformanceScore() {
        return performanceScore;
    }

    /**
     * @param performanceScore
     */
    public void setPerformanceScore(Integer performanceScore) {
        this.performanceScore = performanceScore;
    }

    /**
     * @return match_time
     */
    public Date getMatchTime() {
        return matchTime;
    }

    /**
     * @param matchTime
     */
    public void setMatchTime(Date matchTime) {
        this.matchTime = matchTime;
    }
}