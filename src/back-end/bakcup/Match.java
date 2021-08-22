package com.cg.backend.model;

import java.util.Date;
import javax.persistence.*;

@Table(name = "t_bowl_match")
public class Match {
    @Id
    private Long id;

    /**
     * Game Result
     */
    private String result;

    /**
     * Competition time
     */
    @Column(name = "match_time")
    private Date matchTime;

    /**
     * Name of opponent team
     */
    private String opponent;

    /**
     * team id 
     */
    @Column(name = "team_id")
    private Long teamId;

    /**
     * Season of the game
     */
    private String season;

    /**
     * the type of the game
     */
    private String type;

    /**
     * score of the game
     */
    @Column(name = "team_score")
    private Integer teamScore;

    @Column(name = "opponent_score")
    private Integer opponentScore;

    /**
     * @return id
     */
    public Long getId() {
        return id;
    }

    /**
     * @param id
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * 获取Game Result
     *
     * @return result - Game Result
     */
    public String getResult() {
        return result;
    }

    /**
     * 设置Game Result
     *
     * @param result Game Result
     */
    public void setResult(String result) {
        this.result = result;
    }

    /**
     * 获取Competition time
     *
     * @return match_time - Competition time
     */
    public Date getMatchTime() {
        return matchTime;
    }

    /**
     * 设置Competition time
     *
     * @param matchTime Competition time
     */
    public void setMatchTime(Date matchTime) {
        this.matchTime = matchTime;
    }

    /**
     * 获取Name of opponent team
     *
     * @return opponent - Name of opponent team
     */
    public String getOpponent() {
        return opponent;
    }

    /**
     * 设置Name of opponent team
     *
     * @param opponent Name of opponent team
     */
    public void setOpponent(String opponent) {
        this.opponent = opponent;
    }

    /**
     * 获取team id 
     *
     * @return team_id - team id 
     */
    public Long getTeamId() {
        return teamId;
    }

    /**
     * 设置team id 
     *
     * @param teamId team id 
     */
    public void setTeamId(Long teamId) {
        this.teamId = teamId;
    }

    /**
     * 获取Season of the game
     *
     * @return season - Season of the game
     */
    public String getSeason() {
        return season;
    }

    /**
     * 设置Season of the game
     *
     * @param season Season of the game
     */
    public void setSeason(String season) {
        this.season = season;
    }

    /**
     * 获取the type of the game
     *
     * @return type - the type of the game
     */
    public String getType() {
        return type;
    }

    /**
     * 设置the type of the game
     *
     * @param type the type of the game
     */
    public void setType(String type) {
        this.type = type;
    }

    /**
     * 获取score of the game
     *
     * @return team_score - score of the game
     */
    public Integer getTeamScore() {
        return teamScore;
    }

    /**
     * 设置score of the game
     *
     * @param teamScore score of the game
     */
    public void setTeamScore(Integer teamScore) {
        this.teamScore = teamScore;
    }

    /**
     * @return opponent_score
     */
    public Integer getOpponentScore() {
        return opponentScore;
    }

    /**
     * @param opponentScore
     */
    public void setOpponentScore(Integer opponentScore) {
        this.opponentScore = opponentScore;
    }
}