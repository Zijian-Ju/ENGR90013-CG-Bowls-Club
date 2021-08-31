package com.cg.backend.model;

import java.util.Date;
import javax.persistence.*;

@Table(name = "t_user_info")
public class User {
    @Id
    private Integer id;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "real_name")
    private String realName;

    private String email;

    private String password;

    private String role;

    private String token;

    @Column(name = "token_create_date")
    private Date tokenCreateDate;

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
     * @return user_name
     */
    public String getUserName() {
        return userName;
    }

    /**
     * @param userName
     */
    public void setUserName(String userName) {
        this.userName = userName;
    }

    /**
     * @return real_name
     */
    public String getRealName() {
        return realName;
    }

    /**
     * @param realName
     */
    public void setRealName(String realName) {
        this.realName = realName;
    }

    /**
     * @return email
     */
    public String getEmail() {
        return email;
    }

    /**
     * @param email
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * @return password
     */
    public String getPassword() {
        return password;
    }

    /**
     * @param password
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * @return role
     */
    public String getRole() {
        return role;
    }

    /**
     * @param role
     */
    public void setRole(String role) {
        this.role = role;
    }

    /**
     * @return token
     */
    public String getToken() {
        return token;
    }

    /**
     * @param token
     */
    public void setToken(String token) {
        this.token = token;
    }

    /**
     * @return token_create_date
     */
    public Date getTokenCreateDate() {
        return tokenCreateDate;
    }

    /**
     * @param tokenCreateDate
     */
    public void setTokenCreateDate(Date tokenCreateDate) {
        this.tokenCreateDate = tokenCreateDate;
    }
}