package com.twixer.api.controller;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.twixer.api.entity.Post;
import com.twixer.api.entity.payload.request.PostRequest;
import com.twixer.api.service.PostService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/post")
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:5173" })
public class PostController {

	@Autowired
	private PostService postService;

	@GetMapping
	public List<Post> getAllPosts() {
		return this.postService.getAllPosts();
	}

	@PostMapping
	public ResponseEntity<Post> addNewPost(@Valid @RequestBody PostRequest postRequest, HttpServletRequest request) {
		Post res = this.postService.addNewPost(postRequest, request.getCookies());
		return ResponseEntity.ok(res);
	}

	@GetMapping("recent")
	public List<Post> getRecentPosts() {
		return this.postService.getPostsOrderedByDate();
	}

	@GetMapping("following")
	public Set<Post> getRecentPostsFromFollowers(HttpServletRequest request) {
		return this.postService.getRecentPostsFromFollowers(request.getCookies());
	}

	@GetMapping("reposts")
	public Set<Post> getPostsReposted(HttpServletRequest request) {
		return postService.getRepostsFromUserFromCookie(request.getCookies());
	}

	@PostMapping("reposts/{id}")
	public ResponseEntity<String> addRepost(@PathVariable Long id, HttpServletRequest request) {
		postService.addRepost(id, request.getCookies());
		return ResponseEntity.ok("Succesfully reposted");
	}

	@DeleteMapping("reposts/{id}")
	public ResponseEntity<String> deleteRepost(@PathVariable Long id, HttpServletRequest request) {
		postService.deleteRepost(id, request.getCookies());
		return ResponseEntity.ok("Successfully removed repost");
	}
	
	@GetMapping("favorite")
	public Set<Post> getPostsLiked(HttpServletRequest request) {
		return postService.getFavoriteFromUserFromCookie(request.getCookies());
	}

	@PostMapping("favorite/{id}")
	public ResponseEntity<String> addFavorite(@PathVariable Long id, HttpServletRequest request) {
		postService.addFavorite(id, request.getCookies());
		return ResponseEntity.ok("Succesfully added to favorites");
	}

	@DeleteMapping("favorite/{id}")
	public ResponseEntity<String> deleteFavorite(@PathVariable Long id, HttpServletRequest request) {
		postService.deleteFavorite(id, request.getCookies());
		return ResponseEntity.ok("Successfully removed post from favorites");
	}

}
