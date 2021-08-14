package com.cg.backend.model;

import java.util.List;

public class CompetitionVO {
    private Long id;

    /**
     * team id
     */
    private Long teamId;

    /**
     * Competition Name
     */
    private String competitionName;

    private List<String> competitionDays;

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
    public List<String> getCompetitionDays() {
        return competitionDays;
    }

    /**
     * @param competitionDays
     */
    public void setCompetitionDay(List<String> competitionDays) {
        this.competitionDays = competitionDays;
    }
}
