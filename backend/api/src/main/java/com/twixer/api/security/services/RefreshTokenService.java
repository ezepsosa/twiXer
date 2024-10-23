package com.twixer.api.security.services;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.twixer.api.entity.RefreshToken;
import com.twixer.api.exceptions.TokenRefreshException;
import com.twixer.api.repository.RefreshTokenRepository;
import com.twixer.api.repository.UserRepository;

@Service
public class RefreshTokenService {

	@Value("${jwt.refreshExpirationMs}")
	private Long refreshTokenDurationMs;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RefreshTokenRepository refreshTokenRepository;

	public Optional<RefreshToken> findByToken(String token) {
		return refreshTokenRepository.findByToken(token);
	}

	public RefreshToken createRefreshToken(Long userId) {
		Optional<RefreshToken> existingToken = refreshTokenRepository.findByUserId(userId);

		RefreshToken refreshToken;

		if (existingToken.isPresent()) {
			refreshToken = existingToken.get();
			refreshToken.setExpiryDate(Instant.now().plusMillis(refreshTokenDurationMs));
			refreshToken.setToken(UUID.randomUUID().toString());
		} else {
			refreshToken = new RefreshToken();
			refreshToken.setUser(userRepository.findById(userId).get());
			refreshToken.setExpiryDate(Instant.now().plusMillis(refreshTokenDurationMs));
			refreshToken.setToken(UUID.randomUUID().toString());
		}

		// Guardar el token actualizado o creado en la base de datos
		refreshToken = refreshTokenRepository.save(refreshToken);
		return refreshToken;
	}

	public RefreshToken verifyExpiration(RefreshToken token) {
		if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
			refreshTokenRepository.save(token);
			throw new TokenRefreshException(token.getToken(),
					"Refresh token was expired. Please make a new signin request");
		}
		return token;
	}

	public int deleteByUserId(Long userId) {
		return refreshTokenRepository.deleteByUser(userRepository.findById(userId).get());
	}

}
