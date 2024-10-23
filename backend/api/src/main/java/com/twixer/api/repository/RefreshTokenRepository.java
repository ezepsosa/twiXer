package com.twixer.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import com.twixer.api.entity.RefreshToken;
import com.twixer.api.entity.User;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
	Optional<RefreshToken> findByToken(String token);
	
	Optional<RefreshToken> findByUserId(Long id);

	@Modifying
	int deleteByUser(User user);
}