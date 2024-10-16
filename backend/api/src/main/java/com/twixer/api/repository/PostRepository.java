package com.twixer.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.twixer.api.entity.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long>{
	
	@Query("SELECT p FROM Post p ORDER BY p.date ASC")
	List<Post> findAllByOrderByDateAsc();

}
