package com.twixer.api.service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.twixer.api.entity.User;
import com.twixer.api.repository.UserRepository;
import com.twixer.api.security.jwt.JwtUtils;

import jakarta.servlet.http.Cookie;

@Service
public class UserService {

	private static final String ACCESS_COOKIE = "accessToken";
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
		return Arrays.stream(cookies).filter(cookie -> cookie.getName().equals(ACCESS_COOKIE)).findFirst()
				.map(Cookie::getValue).map(jwtUtils::extractUsername).flatMap(userRepository::findByUsername)
				.map(User::getFollowings).orElse(Set.of());
	}

	public Set<User> showSuggestionsToFollowByUser(Cookie[] cookies) {
		return Arrays.stream(cookies).filter(cookie -> cookie.getName().equals(ACCESS_COOKIE)).findFirst()
				.map(Cookie::getValue).map(jwtUtils::extractUsername).map(userRepository::findRandomUsersToFollow)
				.orElse(Set.of());
	}

	public void followUser(Cookie[] cookies, Long id) {
		User userToFollow = userRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("User to follow with id " + id + " not found"));
		User user = Arrays.stream(cookies).filter(cookie -> cookie.getName().equals(ACCESS_COOKIE)).findFirst()
				.map(Cookie::getValue).map(jwtUtils::extractUsername).flatMap(userRepository::findByUsername)
				.orElseThrow(() -> new IllegalArgumentException("User from token not found"));
		if (!user.getFollowings().contains(userToFollow)) {
			user.getFollowings().add(userToFollow);
			userRepository.save(user);
		}
	}

	public Set<Long> getFollowStatus(Cookie[] cookies, List<Long> listId) {
		User user = Arrays.stream(cookies).filter(cookie -> cookie.getName().equals(ACCESS_COOKIE)).findFirst()
				.map(Cookie::getValue).map(jwtUtils::extractUsername).flatMap(userRepository::findByUsername)
				.orElseThrow(() -> new IllegalArgumentException("User from token not found"));
		Set<Long> idFollowed = user.getFollowings().stream().map(userFollowed -> userFollowed.getId())
				.collect(Collectors.toSet());
		return listId.stream().filter(id -> idFollowed.contains(id)).collect(Collectors.toSet());
	}

	public void unfollowUser(Cookie[] cookies, Long id) {
		User userToUnfollow = userRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("User to follow with id " + id + " not found"));
		User user = Arrays.stream(cookies).filter(cookie -> cookie.getName().equals(ACCESS_COOKIE)).findFirst()
				.map(Cookie::getValue).map(jwtUtils::extractUsername).flatMap(userRepository::findByUsername)
				.orElseThrow(() -> new IllegalArgumentException("User from token not found"));
		if (user.getFollowings().contains(userToUnfollow)) {
			user.getFollowings().remove(userToUnfollow);
			userRepository.save(user);
		}

	}

}
