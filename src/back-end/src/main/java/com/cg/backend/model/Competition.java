package com.cg.backend.model;

import javax.persistence.*;

@Table(name = "t_bowl_competition")
public class Competition {
    @Id
    private Long id;

    /**
     * team id 
     */
    @Column(name = "team_id")
    private Long teamId;

    /**
     * Competition Name
     */
    @Column(name = "competition_name")
    private String competitionName;

    @Column(name = "competition_day")
    private String competitionDay;

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
     * 获取Competition Name
     *
     * @return competition_name - Competition Name
     */
    public String getCompetitionName() {
        return competitionName;
    }

    /**
     * 设置Competition Name
     *
     * @param competitionName Competition Name
     */
    public void setCompetitionName(String competitionName) {
        this.competitionName = competitionName;
    }

    /**
     * @return competition_day
     */
    public String getCompetitionDay() {
        return competitionDay;
    }

    /**
     * @param competitionDay
     */
    public void setCompetitionDay(String competitionDay) {
        this.competitionDay = competitionDay;
    }
}