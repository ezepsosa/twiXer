package com.twixer.api.service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.twixer.api.entity.User;
import com.twixer.api.repository.UserRepository;
import com.twixer.api.security.jwt.JwtUtils;

import jakarta.servlet.http.Cookie;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private JwtUtils jwtUtils;

	public Optional<User> findByUsername(String username) {
		return this.userRepository.findByUsername(username);
	}

	public List<User> showAllUsers() {
		return this.userRepository.findAll();
	}

	public Set<User> showUsersFollowedByUser(Cookie[] cookies) {
		return Arrays.stream(cookies).filter(cookie -> cookie.getName().equals("accessToken")).findFirst()
				.map(Cookie::getValue).map(jwtUtils::extractUsername).flatMap(userRepository::findByUsername)
				.map(User::getFollowings).orElse(Set.of());
	}

	public Set<User> showSuggestionsToFollowByUser(Cookie[] cookies) {
		return Arrays.stream(cookies).filter(cookie -> cookie.getName().equals("accessToken")).findFirst()
				.map(Cookie::getValue).map(jwtUtils::extractUsername).map(userRepository::findRandomUsersToFollow)
				.orElse(Set.of());
	}

}
