package com.twixer.api.service;

import java.util.Arrays;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.twixer.api.entity.Post;
import com.twixer.api.entity.User;
import com.twixer.api.entity.payload.request.PostRequest;
import com.twixer.api.repository.PostRepository;
import com.twixer.api.repository.UserRepository;
import com.twixer.api.security.jwt.JwtUtils;

import jakarta.servlet.http.Cookie;
import jakarta.validation.Valid;

@Service
public class PostService {

	@Autowired
	private PostRepository postRepository;

	@Autowired
	private JwtUtils jwtUtils;

	@Autowired
	private UserRepository userRepository;

	public List<Post> getAllPosts() {
		return this.postRepository.findAll();
	}

	public List<Post> getPostsOrderedByDate() {
		return this.postRepository.findAllByOrderByDateAsc();
	}

	public Set<Post> getRecentPostsFromFollowers(Cookie[] cookies) {
		return Arrays.stream(cookies).filter(cookie -> cookie.getName().equals("accessToken")).findFirst()
				.map(Cookie::getValue).map(jwtUtils::extractUsername).map(postRepository::findRandomPostFromFollowers)
				.orElse(Set.of());
	}

	public Post addNewPost(@Valid PostRequest postRequest, Cookie[] cookies) {
		User author = Arrays.stream(cookies).filter(cookie -> cookie.getName().equals("accessToken")).findFirst()
				.map(Cookie::getValue).map(jwtUtils::extractUsername).map(userRepository::findByUsername).get()
				.orElseThrow(() -> new IllegalArgumentException("User from token not found"));
		Post post = new Post(author, postRequest.getText(), postRequest.getMedia());
		postRepository.save(post);
		return post;
	}

}
