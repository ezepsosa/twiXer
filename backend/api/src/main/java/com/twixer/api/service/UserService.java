package com.twixer.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.twixer.api.entity.User;
import com.twixer.api.repository.UserRepository;

import lombok.NoArgsConstructor;

@Service
public class UserService {
	@Autowired
	private  UserRepository userRepository;
	
	
	public List<User> showAllUsers() {
		return userRepository.findAll();
	}
	
}
