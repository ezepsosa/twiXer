package com.twixer.api.controller;

import java.util.List;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.twixer.api.entity.User;
import com.twixer.api.service.UserService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:5173" })
public class UserController {

	@Autowired
	private UserService userService;

	@GetMapping("all")
	public List<User> getAllUsers() {
		return userService.showAllUsers();
	}

	@GetMapping("/following/all")
	public Set<User> getUsersFollowedByUser(HttpServletRequest request) {
		return userService.showUsersFollowedByUser(request.getCookies());
	};

	@GetMapping("/following/suggestions")
	public Set<User> getSuggestionsToFollowByUser(HttpServletRequest request) {
		return userService.showSuggestionsToFollowByUser(request.getCookies());
	}

	@PostMapping("/add/following/{id}")
	public ResponseEntity<String> followUser(@PathVariable Long id, HttpServletRequest request) {
		userService.followUser(request.getCookies(), id);
		return ResponseEntity.ok("Succesfully followed user");
	}
	
	@PostMapping("/delete/following/{id}")
	public ResponseEntity<String> unfollowUser(@PathVariable Long id, HttpServletRequest request) {
		userService.unfollowUser(request.getCookies(), id);
		return ResponseEntity.ok("Succesfully unfollowed user");
	}

	@PostMapping("/following/status")
	public Set<Long> getFollowStatus(@RequestBody  List<Long> listId, HttpServletRequest request) {
		return userService.getFollowStatus(request.getCookies(), listId);

	}

	@GetMapping("/check/session")
	public ResponseEntity<?> refreshToken(HttpServletRequest request) {
		return ResponseEntity.ok("Session is active");
	}

}
