package com.cg.backend.model;

import javax.persistence.*;

@Table(name = "t_bowl_player")
public class Player {
    @Id
    private Long id;

    @Column(name = "player_name")
    private String playerName;

    @Column(name = "player_email")
    private String playerEmail;

    @Column(name = "player_gender")
    private String playerGender;

    @Column(name = "player_phone")
    private String playerPhone;

    /**
     * plain text of available weekdays
     */
    @Column(name = "player_availability")
    private String playerAvailability;

    /**
     * plain text of preferred position
     */
    @Column(name = "player_pos_preference")
    private String playerPosPreference;

    /**
     * plain text of the names the player like to play with
     */
    @Column(name = "player_prefer_teammates")
    private String playerPreferTeammates;

    /**
     * plain text of the names the player do not like to play with
     */
    @Column(name = "player_not_prefer_teammates")
    private String playerNotPreferTeammates;

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
     * @return player_name
     */
    public String getPlayerName() {
        return playerName;
    }

    /**
     * @param playerName
     */
    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    /**
     * @return player_email
     */
    public String getPlayerEmail() {
        return playerEmail;
    }

    /**
     * @param playerEmail
     */
    public void setPlayerEmail(String playerEmail) {
        this.playerEmail = playerEmail;
    }

    /**
     * @return player_gender
     */
    public String getPlayerGender() {
        return playerGender;
    }

    /**
     * @param playerGender
     */
    public void setPlayerGender(String playerGender) {
        this.playerGender = playerGender;
    }

    /**
     * @return player_phone
     */
    public String getPlayerPhone() {
        return playerPhone;
    }

    /**
     * @param playerPhone
     */
    public void setPlayerPhone(String playerPhone) {
        this.playerPhone = playerPhone;
    }

    /**
     * 获取plain text of available weekdays
     *
     * @return player_availability - plain text of available weekdays
     */
    public String getPlayerAvailability() {
        return playerAvailability;
    }

    /**
     * 设置plain text of available weekdays
     *
     * @param playerAvailability plain text of available weekdays
     */
    public void setPlayerAvailability(String playerAvailability) {
        this.playerAvailability = playerAvailability;
    }

    /**
     * 获取plain text of preferred position
     *
     * @return player_pos_preference - plain text of preferred position
     */
    public String getPlayerPosPreference() {
        return playerPosPreference;
    }

    /**
     * 设置plain text of preferred position
     *
     * @param playerPosPreference plain text of preferred position
     */
    public void setPlayerPosPreference(String playerPosPreference) {
        this.playerPosPreference = playerPosPreference;
    }

    /**
     * 获取plain text of the names the player like to play with
     *
     * @return player_prefer_teammates - plain text of the names the player like to play with
     */
    public String getPlayerPreferTeammates() {
        return playerPreferTeammates;
    }

    /**
     * 设置plain text of the names the player like to play with
     *
     * @param playerPreferTeammates plain text of the names the player like to play with
     */
    public void setPlayerPreferTeammates(String playerPreferTeammates) {
        this.playerPreferTeammates = playerPreferTeammates;
    }

    /**
     * 获取plain text of the names the player do not like to play with
     *
     * @return player_not_prefer_teammates - plain text of the names the player do not like to play with
     */
    public String getPlayerNotPreferTeammates() {
        return playerNotPreferTeammates;
    }

    /**
     * 设置plain text of the names the player do not like to play with
     *
     * @param playerNotPreferTeammates plain text of the names the player do not like to play with
     */
    public void setPlayerNotPreferTeammates(String playerNotPreferTeammates) {
        this.playerNotPreferTeammates = playerNotPreferTeammates;
    }

    public Player(){

    }

    public Player(Long id, String playerName, String playerEmail, String playerGender,
        String playerPhone, String playerAvailability, String playerPosPreference,
        String playerPreferTeammates, String playerNotPreferTeammates) {
        this.id = id;
        this.playerName = playerName;
        this.playerEmail = playerEmail;
        this.playerGender = playerGender;
        this.playerPhone = playerPhone;
        this.playerAvailability = playerAvailability;
        this.playerPosPreference = playerPosPreference;
        this.playerPreferTeammates = playerPreferTeammates;
        this.playerNotPreferTeammates = playerNotPreferTeammates;
    }
}