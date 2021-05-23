package com.javachinna.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Comments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private long id;
    @JsonProperty
    private String comment;
    @ManyToOne
    @JsonIgnore
    private User user;
    private int topicId;
    private int tutorialId;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy - HH:mm ")
    @CreationTimestamp
    private LocalDateTime timestamp;

    @JsonGetter("userName")
    public String getUserName(){
        return user.getDisplayName();
    }
}