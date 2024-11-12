package com.twixer.api.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.twixer.api.entity.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long>{
	
	@Query("SELECT p FROM Post p ORDER BY p.date ASC")
	List<Post> findAllByOrderByDateAsc();
	
	@Query("SELECT p FROM Post p WHERE p.user.id IN (SELECT f.id FROM User user JOIN user.followings f WHERE user.username = :username)")
	Set<Post> findRandomPostFromFollowers(String username);
	@Query("SELECT p.text FROM Post p WHERE p.date BETWEEN :startDate AND :endDate")
	List<String> calculateTrends(LocalDateTime startDate, LocalDateTime endDate);
}
