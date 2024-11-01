package com.twixer.api.entity;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.stereotype.Component;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Component
@AllArgsConstructor
@NoArgsConstructor
@Table(name="post")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    
    private String text;
    
    private Integer reposts;
    
    private Integer likes;
    
    @ElementCollection
    private List<String> media;
    
    private LocalDateTime date;
    
    public Post(User user, String text, List<String> media) {
    	this.user = user;
    	this.text = text;
    	this.media = media;
    	this.reposts = 0;
    	this.likes = 0;
    	this.date = LocalDateTime.now();
    	
    }
}
