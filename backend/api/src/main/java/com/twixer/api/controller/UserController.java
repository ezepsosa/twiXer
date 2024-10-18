package com.twixer.api.controller;

import java.util.List;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.twixer.api.entity.User;
import com.twixer.api.security.jwt.JwtUtils;
import com.twixer.api.service.UserService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:5173" })
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private JwtUtils jwtUtils;

	@GetMapping("all")
	public List<User> getAllUsers() {
		return userService.showAllUsers();
	}

	@GetMapping("/following/all")
	public Set<User> getUsersFollowedByUser(HttpServletRequest request) {
		String username = jwtUtils.getUserNameFromRequest(request);
		return userService.showUsersFollowedByUser(username);
	};

	@GetMapping("/following/suggestions")
	public Set<User> getSuggestionsToFollowByUser(HttpServletRequest request) {
		String username = jwtUtils.getUserNameFromRequest(request);
		return userService.showSuggestionsToFollowByUser(username);
	}
}
