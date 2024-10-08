package com.twixer.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.twixer.api.entity.Post;
import com.twixer.api.service.PostService;

@RestController
@RequestMapping("/api/v1/post")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class PostController {
	
	@Autowired
	private PostService postService;

	@GetMapping("all")
	public List<Post> getAllPosts(){
		List<Post> res = this.postService.getAllPosts();
		return this.postService.getAllPosts();
	}
}
