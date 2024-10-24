package com.twixer.api.controller;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.twixer.api.entity.ERole;
import com.twixer.api.entity.RefreshToken;
import com.twixer.api.entity.Role;
import com.twixer.api.entity.User;
import com.twixer.api.entity.payload.request.LoginRequest;
import com.twixer.api.entity.payload.request.SignupRequest;
import com.twixer.api.entity.payload.response.MessageResponse;
import com.twixer.api.repository.RoleRepository;
import com.twixer.api.repository.UserRepository;
import com.twixer.api.security.jwt.JwtUtils;
import com.twixer.api.security.services.RefreshTokenService;
import com.twixer.api.security.services.UserDetailsImpl;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

	@Value("${jwt.refreshExpirationMs}")
	private int refreshExpirationMs;

	@Value("${jwt.expiration}")
	private int expiration;

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;

	@Autowired
	RefreshTokenService refreshTokenService;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest,
			HttpServletResponse response) {
		try {
			Authentication authentication = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

			RefreshToken refreshToken = refreshTokenService.createRefreshToken(loginRequest.getUsername());
			String accessToken = jwtUtils.GenerateToken(userDetails.getUsername());
			ResponseCookie cookie = ResponseCookie.from("accessToken", accessToken).httpOnly(true).secure(false)
					.path("/").maxAge(expiration).build();
			ResponseCookie refreshTokenCookie = ResponseCookie.from("refresh", refreshToken.getToken())

					.httpOnly(true).secure(false).path("/").maxAge(refreshExpirationMs).build();
			response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
			response.addHeader(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString());
			return ResponseEntity.status(HttpStatus.OK).body("Succesfully logged");
		} catch (BadCredentialsException e) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);

		} catch (AuthenticationException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);

		}
	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
		}

		// Create new user's account
		User user = new User(signUpRequest.getUsername(), signUpRequest.getEmail(),
				encoder.encode(signUpRequest.getPassword()), signUpRequest.getName(),
				signUpRequest.getProfilePictureUrl());

		Set<String> strRoles = signUpRequest.getRole();
		Set<Role> roles = new HashSet<>();

		if (strRoles == null) {
			Role userRole = roleRepository.findByName(ERole.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);
		} else {
			strRoles.forEach(role -> {
				switch (role) {
				case "admin":
					Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(adminRole);

					break;
				case "mod":
					Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(modRole);

					break;
				default:
					Role userRole = roleRepository.findByName(ERole.ROLE_USER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(userRole);
				}
			});
		}

		user.setRoles(roles);
		userRepository.save(user);

		return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully!");
	}

	@PostMapping("/refreshtoken")
	public ResponseEntity<?> refreshToken(HttpServletRequest request, HttpServletResponse response) {
		return Arrays.stream(request.getCookies()).filter(cookie -> "refresh".equals(cookie.getName())).findFirst()
				.map(Cookie::getValue).flatMap(refreshTokenService::findByToken)
				.map(refreshTokenService::verifyExpiration).map(RefreshToken::getUser).map(user -> {
					String token = jwtUtils.GenerateToken(user.getUsername());
					ResponseCookie cookie = ResponseCookie.from("accessToken", token).httpOnly(true).secure(false)
							.path("/").maxAge(expiration).build();
					response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
					return ResponseEntity.status(HttpStatus.OK).body("Successfully refreshed token");
				}).orElseGet(() -> {
					return ResponseEntity.status(HttpStatus.BAD_REQUEST)
							.body("Refresh token cookie is not present or invalid!");
				});
	}

}
