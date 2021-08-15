package com.cg.backend.model;


import java.util.Date;
import javax.persistence.*;

@Table(name = "t_bowl_game_player_performance")
public class Performance {
    @Id
    private Integer id;

    @Column(name = "player_id")
    private Long playerId;

    @Column(name = "competition_id")
    private Long competitionId;

    @Column(name = "performance_score")
    private Integer performanceScore;

    /**
     * The Season of the competition(seperate by year)
     */
    private String season;

    @Column(name = "match_time")
    private Date matchTime;

    /**
     * Postion for the player of this game
     */
    private String position;

    /**
     * @return id
     */
    public Integer getId() {
        return id;
    }

    /**
     * @param id
     */
    public void setId(Integer id) {
        this.id = id;
    }

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
     * @return competition_id
     */
    public Long getCompetitionId() {
        return competitionId;
    }

    /**
     * @param competitionId
     */
    public void setCompetitionId(Long competitionId) {
        this.competitionId = competitionId;
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
     * 获取The Season of the competition(seperate by year)
     *
     * @return season - The Season of the competition(seperate by year)
     */
    public String getSeason() {
        return season;
    }

    /**
     * 设置The Season of the competition(seperate by year)
     *
     * @param season The Season of the competition(seperate by year)
     */
    public void setSeason(String season) {
        this.season = season;
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

    /**
     * 获取Postion for the player of this game
     *
     * @return position - Postion for the player of this game
     */
    public String getPosition() {
        return position;
    }

    /**
     * 设置Postion for the player of this game
     *
     * @param position Postion for the player of this game
     */
    public void setPosition(String position) {
        this.position = position;
    }
}