package com.cg.backend.model;

import javax.persistence.*;

@Table(name = "BASE_USER_INFO")
public class User {
    /**
     * user_id
     */
    @Id
    @Column(name = "USER_ID")
    private Long userId;

    /**
     * nickname
     */
    @Column(name = "USER_NAME")
    private String userName;

    /**
     * nickname
     */
    @Column(name = "NICKNAME")
    private String nickname;

    /**
     * E-mail
     */
    @Column(name = "EMAIL")
    private String email;

    /**
     * phonenumber
     */
    @Column(name = "MOBILE")
    private String mobile;

    /**
     * hashcode of password
     */
    @Column(name = "PASSWORD")
    private String password;

    /**
     * roles, devided by , 
     */
    @Column(name = "ROLE")
    private String role;

    /**
     * 获取user_id
     *
     * @return USER_ID - user_id
     */
    public Long getUserId() {
        return userId;
    }

    /**
     * 设置user_id
     *
     * @param userId user_id
     */
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    /**
     * 获取nickname
     *
     * @return USER_NAME - nickname
     */
    public String getUserName() {
        return userName;
    }

    /**
     * 设置nickname
     *
     * @param userName nickname
     */
    public void setUserName(String userName) {
        this.userName = userName;
    }

    /**
     * 获取nickname
     *
     * @return NICKNAME - nickname
     */
    public String getNickname() {
        return nickname;
    }

    /**
     * 设置nickname
     *
     * @param nickname nickname
     */
    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    /**
     * 获取E-mail
     *
     * @return EMAIL - E-mail
     */
    public String getEmail() {
        return email;
    }

    /**
     * 设置E-mail
     *
     * @param email E-mail
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * 获取phonenumber
     *
     * @return MOBILE - phonenumber
     */
    public String getMobile() {
        return mobile;
    }

    /**
     * 设置phonenumber
     *
     * @param mobile phonenumber
     */
    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    /**
     * 获取hashcode of password
     *
     * @return PASSWORD - hashcode of password
     */
    public String getPassword() {
        return password;
    }

    /**
     * 设置hashcode of password
     *
     * @param password hashcode of password
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * 获取roles, devided by , 
     *
     * @return ROLE - roles, devided by , 
     */
    public String getRole() {
        return role;
    }

    /**
     * 设置roles, devided by , 
     *
     * @param role roles, devided by , 
     */
    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", userName='" + userName + '\'' +
                ", nickname='" + nickname + '\'' +
                ", email='" + email + '\'' +
                ", mobile='" + mobile + '\'' +
                ", password='" + password + '\'' +
                ", role='" + role + '\'' +
                '}';
    }
}