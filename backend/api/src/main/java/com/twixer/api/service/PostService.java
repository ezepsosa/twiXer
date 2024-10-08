package com.twixer.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.twixer.api.entity.Post;
import com.twixer.api.repository.PostRepository;

@Service
public class PostService {
	
	@Autowired
	private PostRepository postRepository;
	
	public List<Post> getAllPosts(){
		return this.postRepository.findAll();
	}
	
}
