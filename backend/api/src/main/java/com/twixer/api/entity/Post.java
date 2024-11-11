package com.twixer.api.entity;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Component;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
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
@Table(name = "post")
public class Post {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	private String text;
	
	@ManyToMany
	@JoinTable(name = "user_respost", joinColumns = @JoinColumn(name="user_id"), inverseJoinColumns = @JoinColumn(name="post_id"))
	private Set<User> repostBy = new HashSet<User>();

	@ManyToMany
	@JoinTable(name = "user_likes", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "post_id"))
	private Set<User> likedBy = new HashSet<User>();

	@ElementCollection
	private List<String> media;

	private LocalDateTime date;

	public Post(User user, String text, List<String> media) {
		this.user = user;
		this.text = text;
		this.media = media;
		this.likedBy = Set.of();
		this.repostBy = Set.of();
		this.date = LocalDateTime.now();

	}
}
