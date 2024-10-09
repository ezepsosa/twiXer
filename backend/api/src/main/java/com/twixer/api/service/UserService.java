package com.twixer.api.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.twixer.api.entity.User;
import com.twixer.api.repository.UserRepository;


@Service
public class UserService {
	@Autowired
	private  UserRepository userRepository;
	
	public Optional<User> findByUsername(String username) {
		return userRepository.findByUsername(username);
	}
	
	public List<User> showAllUsers() {
		return userRepository.findAll();
	}
	
}
