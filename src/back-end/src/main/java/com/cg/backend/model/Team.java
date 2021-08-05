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
    @Column(name = "skip_bowler_id1")
    private Long skipBowlerId1;

    /**
     * name of the skip player
     */
    @Column(name = "skip_bowler_name1")
    private String skipBowlerName1;

    /**
     * player id of the third_bowler
     */
    @Column(name = "third_bowler_id1")
    private Long thirdBowlerId1;

    /**
     * name of the third_bowler
     */
    @Column(name = "third_bowler_name1")
    private String thirdBowlerName1;

    /**
     * player id of the second_bowler
     */
    @Column(name = "second_bowler_id1")
    private Long secondBowlerId1;

    /**
     * name of the second_bowler
     */
    @Column(name = "second_bowler_name1")
    private String secondBowlerName1;

    /**
     * player id of the lead bowler
     */
    @Column(name = "lead_bowler_id1")
    private Long leadBowlerId1;

    /**
     * name of the skip player
     */
    @Column(name = "lead_bowler_name1")
    private String leadBowlerName1;

    /**
     * player id of the skip bowler
     */
    @Column(name = "skip_bowler_id2")
    private Long skipBowlerId2;

    /**
     * name of the skip player
     */
    @Column(name = "skip_bowler_name2")
    private String skipBowlerName2;

    /**
     * player id of the third_bowler
     */
    @Column(name = "third_bowler_id2")
    private Long thirdBowlerId2;

    /**
     * name of the third_bowler
     */
    @Column(name = "third_bowler_name2")
    private String thirdBowlerName2;

    /**
     * player id of the second_bowler
     */
    @Column(name = "second_bowler_id2")
    private Long secondBowlerId2;

    /**
     * name of the second_bowler
     */
    @Column(name = "second_bowler_name2")
    private String secondBowlerName2;

    /**
     * player id of the lead bowler
     */
    @Column(name = "lead_bowler_id2")
    private Long leadBowlerId2;

    /**
     * name of the skip player
     */
    @Column(name = "lead_bowler_name2")
    private String leadBowlerName2;

    /**
     * player id of the skip bowler
     */
    @Column(name = "skip_bowler_id3")
    private Long skipBowlerId3;

    /**
     * name of the skip player
     */
    @Column(name = "skip_bowler_name3")
    private String skipBowlerName3;

    /**
     * player id of the third_bowler
     */
    @Column(name = "third_bowler_id3")
    private Long thirdBowlerId3;

    /**
     * name of the third_bowler
     */
    @Column(name = "third_bowler_name3")
    private String thirdBowlerName3;

    /**
     * player id of the second_bowler
     */
    @Column(name = "second_bowler_id3")
    private Long secondBowlerId3;

    /**
     * name of the second_bowler
     */
    @Column(name = "second_bowler_name3")
    private String secondBowlerName3;

    /**
     * player id of the lead bowler
     */
    @Column(name = "lead_bowler_id3")
    private Long leadBowlerId3;

    /**
     * name of the skip player
     */
    @Column(name = "lead_bowler_name3")
    private String leadBowlerName3;

    /**
     * player id of the skip bowler
     */
    @Column(name = "skip_bowler_id4")
    private Long skipBowlerId4;

    /**
     * name of the skip player
     */
    @Column(name = "skip_bowler_name4")
    private String skipBowlerName4;

    /**
     * player id of the third_bowler
     */
    @Column(name = "third_bowler_id4")
    private Long thirdBowlerId4;

    /**
     * name of the third_bowler
     */
    @Column(name = "third_bowler_name4")
    private String thirdBowlerName4;

    /**
     * player id of the second_bowler
     */
    @Column(name = "second_bowler_id4")
    private Long secondBowlerId4;

    /**
     * name of the second_bowler
     */
    @Column(name = "second_bowler_name4")
    private String secondBowlerName4;

    /**
     * player id of the lead bowler
     */
    @Column(name = "lead_bowler_id4")
    private Long leadBowlerId4;

    /**
     * name of the skip player
     */
    @Column(name = "lead_bowler_name4")
    private String leadBowlerName4;

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
     * @return skip_bowler_id1 - player id of the skip bowler
     */
    public Long getSkipBowlerId1() {
        return skipBowlerId1;
    }

    /**
     * 设置player id of the skip bowler
     *
     * @param skipBowlerId1 player id of the skip bowler
     */
    public void setSkipBowlerId1(Long skipBowlerId1) {
        this.skipBowlerId1 = skipBowlerId1;
    }

    /**
     * 获取name of the skip player
     *
     * @return skip_bowler_name1 - name of the skip player
     */
    public String getSkipBowlerName1() {
        return skipBowlerName1;
    }

    /**
     * 设置name of the skip player
     *
     * @param skipBowlerName1 name of the skip player
     */
    public void setSkipBowlerName1(String skipBowlerName1) {
        this.skipBowlerName1 = skipBowlerName1;
    }

    /**
     * 获取player id of the third_bowler
     *
     * @return third_bowler_id1 - player id of the third_bowler
     */
    public Long getThirdBowlerId1() {
        return thirdBowlerId1;
    }

    /**
     * 设置player id of the third_bowler
     *
     * @param thirdBowlerId1 player id of the third_bowler
     */
    public void setThirdBowlerId1(Long thirdBowlerId1) {
        this.thirdBowlerId1 = thirdBowlerId1;
    }

    /**
     * 获取name of the third_bowler
     *
     * @return third_bowler_name1 - name of the third_bowler
     */
    public String getThirdBowlerName1() {
        return thirdBowlerName1;
    }

    /**
     * 设置name of the third_bowler
     *
     * @param thirdBowlerName1 name of the third_bowler
     */
    public void setThirdBowlerName1(String thirdBowlerName1) {
        this.thirdBowlerName1 = thirdBowlerName1;
    }

    /**
     * 获取player id of the second_bowler
     *
     * @return second_bowler_id1 - player id of the second_bowler
     */
    public Long getSecondBowlerId1() {
        return secondBowlerId1;
    }

    /**
     * 设置player id of the second_bowler
     *
     * @param secondBowlerId1 player id of the second_bowler
     */
    public void setSecondBowlerId1(Long secondBowlerId1) {
        this.secondBowlerId1 = secondBowlerId1;
    }

    /**
     * 获取name of the second_bowler
     *
     * @return second_bowler_name1 - name of the second_bowler
     */
    public String getSecondBowlerName1() {
        return secondBowlerName1;
    }

    /**
     * 设置name of the second_bowler
     *
     * @param secondBowlerName1 name of the second_bowler
     */
    public void setSecondBowlerName1(String secondBowlerName1) {
        this.secondBowlerName1 = secondBowlerName1;
    }

    /**
     * 获取player id of the lead bowler
     *
     * @return lead_bowler_id1 - player id of the lead bowler
     */
    public Long getLeadBowlerId1() {
        return leadBowlerId1;
    }

    /**
     * 设置player id of the lead bowler
     *
     * @param leadBowlerId1 player id of the lead bowler
     */
    public void setLeadBowlerId1(Long leadBowlerId1) {
        this.leadBowlerId1 = leadBowlerId1;
    }

    /**
     * 获取name of the skip player
     *
     * @return lead_bowler_name1 - name of the skip player
     */
    public String getLeadBowlerName1() {
        return leadBowlerName1;
    }

    /**
     * 设置name of the skip player
     *
     * @param leadBowlerName1 name of the skip player
     */
    public void setLeadBowlerName1(String leadBowlerName1) {
        this.leadBowlerName1 = leadBowlerName1;
    }

    /**
     * 获取player id of the skip bowler
     *
     * @return skip_bowler_id2 - player id of the skip bowler
     */
    public Long getSkipBowlerId2() {
        return skipBowlerId2;
    }

    /**
     * 设置player id of the skip bowler
     *
     * @param skipBowlerId2 player id of the skip bowler
     */
    public void setSkipBowlerId2(Long skipBowlerId2) {
        this.skipBowlerId2 = skipBowlerId2;
    }

    /**
     * 获取name of the skip player
     *
     * @return skip_bowler_name2 - name of the skip player
     */
    public String getSkipBowlerName2() {
        return skipBowlerName2;
    }

    /**
     * 设置name of the skip player
     *
     * @param skipBowlerName2 name of the skip player
     */
    public void setSkipBowlerName2(String skipBowlerName2) {
        this.skipBowlerName2 = skipBowlerName2;
    }

    /**
     * 获取player id of the third_bowler
     *
     * @return third_bowler_id2 - player id of the third_bowler
     */
    public Long getThirdBowlerId2() {
        return thirdBowlerId2;
    }

    /**
     * 设置player id of the third_bowler
     *
     * @param thirdBowlerId2 player id of the third_bowler
     */
    public void setThirdBowlerId2(Long thirdBowlerId2) {
        this.thirdBowlerId2 = thirdBowlerId2;
    }

    /**
     * 获取name of the third_bowler
     *
     * @return third_bowler_name2 - name of the third_bowler
     */
    public String getThirdBowlerName2() {
        return thirdBowlerName2;
    }

    /**
     * 设置name of the third_bowler
     *
     * @param thirdBowlerName2 name of the third_bowler
     */
    public void setThirdBowlerName2(String thirdBowlerName2) {
        this.thirdBowlerName2 = thirdBowlerName2;
    }

    /**
     * 获取player id of the second_bowler
     *
     * @return second_bowler_id2 - player id of the second_bowler
     */
    public Long getSecondBowlerId2() {
        return secondBowlerId2;
    }

    /**
     * 设置player id of the second_bowler
     *
     * @param secondBowlerId2 player id of the second_bowler
     */
    public void setSecondBowlerId2(Long secondBowlerId2) {
        this.secondBowlerId2 = secondBowlerId2;
    }

    /**
     * 获取name of the second_bowler
     *
     * @return second_bowler_name2 - name of the second_bowler
     */
    public String getSecondBowlerName2() {
        return secondBowlerName2;
    }

    /**
     * 设置name of the second_bowler
     *
     * @param secondBowlerName2 name of the second_bowler
     */
    public void setSecondBowlerName2(String secondBowlerName2) {
        this.secondBowlerName2 = secondBowlerName2;
    }

    /**
     * 获取player id of the lead bowler
     *
     * @return lead_bowler_id2 - player id of the lead bowler
     */
    public Long getLeadBowlerId2() {
        return leadBowlerId2;
    }

    /**
     * 设置player id of the lead bowler
     *
     * @param leadBowlerId2 player id of the lead bowler
     */
    public void setLeadBowlerId2(Long leadBowlerId2) {
        this.leadBowlerId2 = leadBowlerId2;
    }

    /**
     * 获取name of the skip player
     *
     * @return lead_bowler_name2 - name of the skip player
     */
    public String getLeadBowlerName2() {
        return leadBowlerName2;
    }

    /**
     * 设置name of the skip player
     *
     * @param leadBowlerName2 name of the skip player
     */
    public void setLeadBowlerName2(String leadBowlerName2) {
        this.leadBowlerName2 = leadBowlerName2;
    }

    /**
     * 获取player id of the skip bowler
     *
     * @return skip_bowler_id3 - player id of the skip bowler
     */
    public Long getSkipBowlerId3() {
        return skipBowlerId3;
    }

    /**
     * 设置player id of the skip bowler
     *
     * @param skipBowlerId3 player id of the skip bowler
     */
    public void setSkipBowlerId3(Long skipBowlerId3) {
        this.skipBowlerId3 = skipBowlerId3;
    }

    /**
     * 获取name of the skip player
     *
     * @return skip_bowler_name3 - name of the skip player
     */
    public String getSkipBowlerName3() {
        return skipBowlerName3;
    }

    /**
     * 设置name of the skip player
     *
     * @param skipBowlerName3 name of the skip player
     */
    public void setSkipBowlerName3(String skipBowlerName3) {
        this.skipBowlerName3 = skipBowlerName3;
    }

    /**
     * 获取player id of the third_bowler
     *
     * @return third_bowler_id3 - player id of the third_bowler
     */
    public Long getThirdBowlerId3() {
        return thirdBowlerId3;
    }

    /**
     * 设置player id of the third_bowler
     *
     * @param thirdBowlerId3 player id of the third_bowler
     */
    public void setThirdBowlerId3(Long thirdBowlerId3) {
        this.thirdBowlerId3 = thirdBowlerId3;
    }

    /**
     * 获取name of the third_bowler
     *
     * @return third_bowler_name3 - name of the third_bowler
     */
    public String getThirdBowlerName3() {
        return thirdBowlerName3;
    }

    /**
     * 设置name of the third_bowler
     *
     * @param thirdBowlerName3 name of the third_bowler
     */
    public void setThirdBowlerName3(String thirdBowlerName3) {
        this.thirdBowlerName3 = thirdBowlerName3;
    }

    /**
     * 获取player id of the second_bowler
     *
     * @return second_bowler_id3 - player id of the second_bowler
     */
    public Long getSecondBowlerId3() {
        return secondBowlerId3;
    }

    /**
     * 设置player id of the second_bowler
     *
     * @param secondBowlerId3 player id of the second_bowler
     */
    public void setSecondBowlerId3(Long secondBowlerId3) {
        this.secondBowlerId3 = secondBowlerId3;
    }

    /**
     * 获取name of the second_bowler
     *
     * @return second_bowler_name3 - name of the second_bowler
     */
    public String getSecondBowlerName3() {
        return secondBowlerName3;
    }

    /**
     * 设置name of the second_bowler
     *
     * @param secondBowlerName3 name of the second_bowler
     */
    public void setSecondBowlerName3(String secondBowlerName3) {
        this.secondBowlerName3 = secondBowlerName3;
    }

    /**
     * 获取player id of the lead bowler
     *
     * @return lead_bowler_id3 - player id of the lead bowler
     */
    public Long getLeadBowlerId3() {
        return leadBowlerId3;
    }

    /**
     * 设置player id of the lead bowler
     *
     * @param leadBowlerId3 player id of the lead bowler
     */
    public void setLeadBowlerId3(Long leadBowlerId3) {
        this.leadBowlerId3 = leadBowlerId3;
    }

    /**
     * 获取name of the skip player
     *
     * @return lead_bowler_name3 - name of the skip player
     */
    public String getLeadBowlerName3() {
        return leadBowlerName3;
    }

    /**
     * 设置name of the skip player
     *
     * @param leadBowlerName3 name of the skip player
     */
    public void setLeadBowlerName3(String leadBowlerName3) {
        this.leadBowlerName3 = leadBowlerName3;
    }

    /**
     * 获取player id of the skip bowler
     *
     * @return skip_bowler_id4 - player id of the skip bowler
     */
    public Long getSkipBowlerId4() {
        return skipBowlerId4;
    }

    /**
     * 设置player id of the skip bowler
     *
     * @param skipBowlerId4 player id of the skip bowler
     */
    public void setSkipBowlerId4(Long skipBowlerId4) {
        this.skipBowlerId4 = skipBowlerId4;
    }

    /**
     * 获取name of the skip player
     *
     * @return skip_bowler_name4 - name of the skip player
     */
    public String getSkipBowlerName4() {
        return skipBowlerName4;
    }

    /**
     * 设置name of the skip player
     *
     * @param skipBowlerName4 name of the skip player
     */
    public void setSkipBowlerName4(String skipBowlerName4) {
        this.skipBowlerName4 = skipBowlerName4;
    }

    /**
     * 获取player id of the third_bowler
     *
     * @return third_bowler_id4 - player id of the third_bowler
     */
    public Long getThirdBowlerId4() {
        return thirdBowlerId4;
    }

    /**
     * 设置player id of the third_bowler
     *
     * @param thirdBowlerId4 player id of the third_bowler
     */
    public void setThirdBowlerId4(Long thirdBowlerId4) {
        this.thirdBowlerId4 = thirdBowlerId4;
    }

    /**
     * 获取name of the third_bowler
     *
     * @return third_bowler_name4 - name of the third_bowler
     */
    public String getThirdBowlerName4() {
        return thirdBowlerName4;
    }

    /**
     * 设置name of the third_bowler
     *
     * @param thirdBowlerName4 name of the third_bowler
     */
    public void setThirdBowlerName4(String thirdBowlerName4) {
        this.thirdBowlerName4 = thirdBowlerName4;
    }

    /**
     * 获取player id of the second_bowler
     *
     * @return second_bowler_id4 - player id of the second_bowler
     */
    public Long getSecondBowlerId4() {
        return secondBowlerId4;
    }

    /**
     * 设置player id of the second_bowler
     *
     * @param secondBowlerId4 player id of the second_bowler
     */
    public void setSecondBowlerId4(Long secondBowlerId4) {
        this.secondBowlerId4 = secondBowlerId4;
    }

    /**
     * 获取name of the second_bowler
     *
     * @return second_bowler_name4 - name of the second_bowler
     */
    public String getSecondBowlerName4() {
        return secondBowlerName4;
    }

    /**
     * 设置name of the second_bowler
     *
     * @param secondBowlerName4 name of the second_bowler
     */
    public void setSecondBowlerName4(String secondBowlerName4) {
        this.secondBowlerName4 = secondBowlerName4;
    }

    /**
     * 获取player id of the lead bowler
     *
     * @return lead_bowler_id4 - player id of the lead bowler
     */
    public Long getLeadBowlerId4() {
        return leadBowlerId4;
    }

    /**
     * 设置player id of the lead bowler
     *
     * @param leadBowlerId4 player id of the lead bowler
     */
    public void setLeadBowlerId4(Long leadBowlerId4) {
        this.leadBowlerId4 = leadBowlerId4;
    }

    /**
     * 获取name of the skip player
     *
     * @return lead_bowler_name4 - name of the skip player
     */
    public String getLeadBowlerName4() {
        return leadBowlerName4;
    }

    /**
     * 设置name of the skip player
     *
     * @param leadBowlerName4 name of the skip player
     */
    public void setLeadBowlerName4(String leadBowlerName4) {
        this.leadBowlerName4 = leadBowlerName4;
    }
}