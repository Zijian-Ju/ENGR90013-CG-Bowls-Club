package com.cg.backend.model;

import javax.persistence.*;

@Table(name = "t_bowl_team")
public class Team {
    @Id
    private Long id;

    /**
     * name of the team
     */
    @Column(name = "team_name")
    private String teamName;

    /**
     * player id of the skip bowler
     */
    @Column(name = "skip_bowler_id")
    private Long skipBowlerId;

    /**
     * name of the skip player
     */
    @Column(name = "skip_bowler_name")
    private String skipBowlerName;

    /**
     * player id of the third_bowler
     */
    @Column(name = "third_bowler_id")
    private Long thirdBowlerId;

    /**
     * name of the third_bowler
     */
    @Column(name = "third_bowler_name")
    private String thirdBowlerName;

    /**
     * player id of the second_bowler
     */
    @Column(name = "second_bowler_id")
    private Long secondBowlerId;

    /**
     * name of the second_bowler
     */
    @Column(name = "second_bowler_name")
    private String secondBowlerName;

    /**
     * player id of the lead bowler
     */
    @Column(name = "lead_bowler_id")
    private Long leadBowlerId;

    /**
     * name of the skip player
     */
    @Column(name = "lead_bowler_name")
    private String leadBowlerName;

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
     * 获取name of the team
     *
     * @return team_name - name of the team
     */
    public String getTeamName() {
        return teamName;
    }

    /**
     * 设置name of the team
     *
     * @param teamName name of the team
     */
    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    /**
     * 获取player id of the skip bowler
     *
     * @return skip_bowler_id - player id of the skip bowler
     */
    public Long getSkipBowlerId() {
        return skipBowlerId;
    }

    /**
     * 设置player id of the skip bowler
     *
     * @param skipBowlerId player id of the skip bowler
     */
    public void setSkipBowlerId(Long skipBowlerId) {
        this.skipBowlerId = skipBowlerId;
    }

    /**
     * 获取name of the skip player
     *
     * @return skip_bowler_name - name of the skip player
     */
    public String getSkipBowlerName() {
        return skipBowlerName;
    }

    /**
     * 设置name of the skip player
     *
     * @param skipBowlerName name of the skip player
     */
    public void setSkipBowlerName(String skipBowlerName) {
        this.skipBowlerName = skipBowlerName;
    }

    /**
     * 获取player id of the third_bowler
     *
     * @return third_bowler_id - player id of the third_bowler
     */
    public Long getThirdBowlerId() {
        return thirdBowlerId;
    }

    /**
     * 设置player id of the third_bowler
     *
     * @param thirdBowlerId player id of the third_bowler
     */
    public void setThirdBowlerId(Long thirdBowlerId) {
        this.thirdBowlerId = thirdBowlerId;
    }

    /**
     * 获取name of the third_bowler
     *
     * @return third_bowler_name - name of the third_bowler
     */
    public String getThirdBowlerName() {
        return thirdBowlerName;
    }

    /**
     * 设置name of the third_bowler
     *
     * @param thirdBowlerName name of the third_bowler
     */
    public void setThirdBowlerName(String thirdBowlerName) {
        this.thirdBowlerName = thirdBowlerName;
    }

    /**
     * 获取player id of the second_bowler
     *
     * @return second_bowler_id - player id of the second_bowler
     */
    public Long getSecondBowlerId() {
        return secondBowlerId;
    }

    /**
     * 设置player id of the second_bowler
     *
     * @param secondBowlerId player id of the second_bowler
     */
    public void setSecondBowlerId(Long secondBowlerId) {
        this.secondBowlerId = secondBowlerId;
    }

    /**
     * 获取name of the second_bowler
     *
     * @return second_bowler_name - name of the second_bowler
     */
    public String getSecondBowlerName() {
        return secondBowlerName;
    }

    /**
     * 设置name of the second_bowler
     *
     * @param secondBowlerName name of the second_bowler
     */
    public void setSecondBowlerName(String secondBowlerName) {
        this.secondBowlerName = secondBowlerName;
    }

    /**
     * 获取player id of the lead bowler
     *
     * @return lead_bowler_id - player id of the lead bowler
     */
    public Long getLeadBowlerId() {
        return leadBowlerId;
    }

    /**
     * 设置player id of the lead bowler
     *
     * @param leadBowlerId player id of the lead bowler
     */
    public void setLeadBowlerId(Long leadBowlerId) {
        this.leadBowlerId = leadBowlerId;
    }

    /**
     * 获取name of the skip player
     *
     * @return lead_bowler_name - name of the skip player
     */
    public String getLeadBowlerName() {
        return leadBowlerName;
    }

    /**
     * 设置name of the skip player
     *
     * @param leadBowlerName name of the skip player
     */
    public void setLeadBowlerName(String leadBowlerName) {
        this.leadBowlerName = leadBowlerName;
    }
}