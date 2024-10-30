package com.twixer.api.controller;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.twixer.api.entity.Post;
import com.twixer.api.service.PostService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/v1/post")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class PostController {
	
	@Autowired
	private PostService postService;

	@GetMapping("all")
	public List<Post> getAllPosts(){
		return this.postService.getAllPosts();
	}
	
	@GetMapping("recent")
	public List<Post> getRecentPosts(){
		return this.postService.getPostsOrderedByDate();
	}
	
	@GetMapping("following/recent")
	public Set<Post> getRecentPostsFromFollowers(HttpServletRequest request){
		return this.postService.getRecentPostsFromFollowers(request.getCookies());
	}
}
