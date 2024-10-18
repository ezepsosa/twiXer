package com.twixer.api.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.twixer.api.entity.User;
import com.twixer.api.repository.UserRepository;


@Service
public class UserService {
	@Autowired
	private  UserRepository userRepository;
	
	public Optional<User> findByUsername(String username) {
		return this.userRepository.findByUsername(username);
	}
	
	public List<User> showAllUsers() {
		return this.userRepository.findAll();
	}
	
	public Set<User> showUsersFollowedByUser(String username){
		Optional<User> user = userRepository.findByUsername(username);
		if(user.isPresent()) {
			return user.get().getFollowings();
		}
		return Set.of();
	}

	public Set<User> showSuggestionsToFollowByUser(String username) {
		return userRepository.findRandomUsersToFollow(username);
	}


}
