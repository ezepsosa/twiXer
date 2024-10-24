package com.twixer.api.controller.test;

import static org.springframework.test.web.client.match.MockRestRequestMatchers.content;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.twixer.api.entity.User;
import com.twixer.api.entity.payload.request.LoginRequest;
import com.twixer.api.entity.payload.request.SignupRequest;

import jakarta.servlet.http.Cookie;

@AutoConfigureMockMvc
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@TestPropertySource("classpath:application-test.properties")
public class AuthControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private ObjectMapper objectMapper;

	@Autowired
	PasswordEncoder encoder;

	@Test
	public void shouldSuccessSignUpWithRoleFound() throws Exception {
		User testUser = new User("test_user_no_role", "user_email_no_role@test.com", "Abs62Bxsad", "User name", "");
		SignupRequest testSignUpRequest = new SignupRequest();
		testSignUpRequest.setName(testUser.getName());
		testSignUpRequest.setPassword(testUser.getPassword());
		testSignUpRequest.setUsername(testUser.getUsername());
		testSignUpRequest.setRole(null);
		testSignUpRequest.setEmail(testUser.getEmail());
		this.mockMvc.perform(post("/api/v1/auth/signup").contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(testSignUpRequest))).andExpect(status().isCreated());

	}

	@Test
	public void shouldSuccessSignUpUser() throws Exception {
		User testUser = new User("test_user", "user_email@test.com", "Abs62Bxsad", "User name", "");
		SignupRequest testSignUpRequest = new SignupRequest();
		testSignUpRequest.setName(testUser.getName());
		testSignUpRequest.setPassword(testUser.getPassword());
		testSignUpRequest.setUsername(testUser.getUsername());
		testSignUpRequest.setRole(new HashSet<>(Set.of("user")));
		testSignUpRequest.setEmail(testUser.getEmail());
		this.mockMvc.perform(post("/api/v1/auth/signup").contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(testSignUpRequest))).andExpect(status().isCreated());

	}

	@Test
	public void shouldSuccessSignUpAdmin() throws Exception {
		User testUser = new User("test_admin", "admin_email@test.com", "Abs62Bxsad", "Admin name", "");
		SignupRequest testSignUpRequest = new SignupRequest();
		testSignUpRequest.setName(testUser.getName());
		testSignUpRequest.setPassword(testUser.getPassword());
		testSignUpRequest.setUsername(testUser.getUsername());
		testSignUpRequest.setRole(new HashSet<>(Set.of("admin")));
		testSignUpRequest.setEmail(testUser.getEmail());
		this.mockMvc.perform(post("/api/v1/auth/signup").contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(testSignUpRequest))).andExpect(status().isCreated());

	}

	@Test
	public void shouldSuccessSignUpMod() throws Exception {
		User testUser = new User("test_mod", "mod_email@test.com", "Abs62Bxsad", "Mod name", "");
		SignupRequest testSignUpRequest = new SignupRequest();
		testSignUpRequest.setName(testUser.getName());
		testSignUpRequest.setPassword(testUser.getPassword());
		testSignUpRequest.setUsername(testUser.getUsername());
		testSignUpRequest.setRole(new HashSet<>(Set.of("mod")));
		testSignUpRequest.setEmail(testUser.getEmail());
		this.mockMvc.perform(post("/api/v1/auth/signup").contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(testSignUpRequest))).andExpect(status().isCreated());

	}

	@Test
	public void shouldFailSignUpEmailExits() throws Exception {
		User testUser = new User("test_username", "example@example.com", "Abs62Bxsad", "User name", "");
		SignupRequest testSignUpRequest = new SignupRequest();
		testSignUpRequest.setName(testUser.getName());
		testSignUpRequest.setPassword(testUser.getPassword());
		testSignUpRequest.setUsername(testUser.getUsername());
		testSignUpRequest.setRole(new HashSet<>(Set.of("user")));
		testSignUpRequest.setEmail(testUser.getEmail());
		this.mockMvc
				.perform(post("/api/v1/auth/signup").contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(testSignUpRequest)))
				.andExpect(status().isBadRequest())
				.andExpect(jsonPath("$.message").value(("Error: Email is already in use!")));

	}

	@Test
	public void shouldFailSignUpUsernameExits() throws Exception {
		User testUser = new User("john_doe", "test_email@test.com", "Abs62Bxsad", "User name", "");
		SignupRequest testSignUpRequest = new SignupRequest();
		testSignUpRequest.setName(testUser.getName());
		testSignUpRequest.setPassword(testUser.getPassword());
		testSignUpRequest.setUsername(testUser.getUsername());
		testSignUpRequest.setRole(new HashSet<>(Set.of("user")));
		testSignUpRequest.setEmail(testUser.getEmail());
		this.mockMvc
				.perform(post("/api/v1/auth/signup").contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(testSignUpRequest)))
				.andExpect(status().isBadRequest())
				.andExpect(jsonPath("$.message").value(("Error: Username is already taken!")));

	}

	@Test
	public void shouldSuccessLogin() throws Exception {
		LoginRequest testLoginRequest = new LoginRequest();
		testLoginRequest.setUsername("john_doe");
		testLoginRequest.setPassword("hashed_password");
		this.mockMvc.perform(post("/api/v1/auth/signin").contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(testLoginRequest))).andExpect(status().isOk());

	}
	@Test
	public void shouldFailLoginBadCredentials() throws Exception {
		LoginRequest testLoginRequest = new LoginRequest();
		testLoginRequest.setUsername("no_username");
		testLoginRequest.setPassword("false_password");
		this.mockMvc.perform(post("/api/v1/auth/signin").contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(testLoginRequest))).andExpect(status().isForbidden());

	}

	
	@Test
	public void shouldFailLoginUserBadRequeset() throws Exception {
		LoginRequest testLoginRequest = new LoginRequest();
		testLoginRequest.setUsername("john_doe");
		this.mockMvc.perform(post("/api/v1/auth/signin").contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(testLoginRequest))).andExpect(status().isBadRequest());

	}

	@Test
	public void ShouldSuccessRefreshToken() throws Exception {
		LoginRequest testLoginRequest = new LoginRequest();
		testLoginRequest.setUsername("john_doe");
		testLoginRequest.setPassword("hashed_password");
		Cookie[] cookies = this.mockMvc
				.perform(post("/api/v1/auth/signin").contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(testLoginRequest)))
				.andReturn().getResponse().getCookies();
		this.mockMvc.perform(post("/api/v1/auth/refreshtoken").contentType(MediaType.APPLICATION_JSON).cookie(cookies))
				.andExpect(status().isOk());
	}
	
	@Test
	public void ShouldFailRefreshTokenWithoutCookie() throws Exception {
		Cookie[] cookies = new Cookie[1];
		cookies[0] = new Cookie("test", "");
		this.mockMvc.perform(post("/api/v1/auth/refreshtoken").contentType(MediaType.APPLICATION_JSON).cookie(cookies))
				.andExpect(status().isBadRequest());
	}

}
