package com.twixer.api.service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

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

	private static final String ACCESS_COOKIE = "accessToken";

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
		return Arrays.stream(cookies).filter(cookie -> cookie.getName().equals(ACCESS_COOKIE)).findFirst()
				.map(Cookie::getValue).map(jwtUtils::extractUsername).map(postRepository::findRandomPostFromFollowers)
				.orElse(Set.of());
	}

	public Post addNewPost(@Valid PostRequest postRequest, Cookie[] cookies) {
		User user = getUserFromCookie(cookies);
		Post post = new Post(user, postRequest.getText(), postRequest.getMedia());
		postRepository.save(post);
		return post;
	}

	public void addRepost(Long id, Cookie[] cookies) {
		User user = getUserFromCookie(cookies);
		Optional<Post> optionaPost = postRepository.findById(id);
		if (optionaPost.isPresent()) {
			Post post = optionaPost.get();
			Set<User> postLikedBy = post.getLikedBy();
			postLikedBy.add(user);
			post.setLikedBy(postLikedBy);
			postRepository.save(post);
		} else {
			throw new IllegalArgumentException("Post with id " + id + " not found");
		}
	}

	public void deleteRepost(Long id, Cookie[] cookies) {
		User user = getUserFromCookie(cookies);
		Optional<Post> optionaPost = postRepository.findById(id);
		if (optionaPost.isPresent()) {
			Post post = optionaPost.get();
			Set<User> postLikedBy = post.getLikedBy();
			postLikedBy.remove(user);
			post.setLikedBy(postLikedBy);
			postRepository.save(post);
		} else {
			throw new IllegalArgumentException("Post with id " + id + " not found");
		}
	}

	public Set<Post> getRepostsFromUserFromCookie(Cookie[] cookies) {
		User user = getUserFromCookie(cookies);
		return postRepository.findAll().stream().filter(post -> post.getLikedBy().contains(user))
				.collect(Collectors.toSet());
	}

	private User getUserFromCookie(Cookie[] cookies) {
		return Arrays.stream(cookies).filter(cookie -> cookie.getName().equals(ACCESS_COOKIE)).findFirst()
				.map(Cookie::getValue).map(jwtUtils::extractUsername).map(userRepository::findByUsername).get()
				.orElseThrow(() -> new IllegalArgumentException("User from token not found"));
	}

}
