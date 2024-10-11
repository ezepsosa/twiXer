package com.twixer.api.controller.test;

import static org.hamcrest.CoreMatchers.containsString;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.HashSet;
import java.util.Set;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.twixer.api.entity.User;
import com.twixer.api.entity.payload.request.LoginRequest;
import com.twixer.api.entity.payload.request.SignupRequest;
import com.twixer.api.repository.UserRepository;

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
	public void shouldSuccessWithRoleFound() throws Exception {
		User testUser = new User("test_user_no_role", "user_email_no_role@test.com", "Abs62Bxsad", "User name", "");
		SignupRequest testSignUpRequest = new SignupRequest();
		testSignUpRequest.setName(testUser.getName());
		testSignUpRequest.setPassword(testUser.getPassword());
		testSignUpRequest.setUsername(testUser.getUsername());
		testSignUpRequest.setRole(null);
		testSignUpRequest.setEmail(testUser.getEmail());
		this.mockMvc
		.perform(post("/api/v1/auth/signup").contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(testSignUpRequest)))
		.andExpect(status().isOk())
		.andExpect(jsonPath("$.message").value(("User registered successfully!")));

	}

	@Test
	public void shouldCreateUser() throws Exception {
		User testUser = new User("test_user", "user_email@test.com", "Abs62Bxsad", "User name", "");
		SignupRequest testSignUpRequest = new SignupRequest();
		testSignUpRequest.setName(testUser.getName());
		testSignUpRequest.setPassword(testUser.getPassword());
		testSignUpRequest.setUsername(testUser.getUsername());
		testSignUpRequest.setRole(new HashSet<>(Set.of("user")));
		testSignUpRequest.setEmail(testUser.getEmail());
		this.mockMvc.perform(post("/api/v1/auth/signup").contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(testSignUpRequest))).andExpect(status().isOk());

	}

	@Test
	public void shouldCreateAdmin() throws Exception {
		User testUser = new User("test_admin", "admin_email@test.com", "Abs62Bxsad", "Admin name", "");
		SignupRequest testSignUpRequest = new SignupRequest();
		testSignUpRequest.setName(testUser.getName());
		testSignUpRequest.setPassword(testUser.getPassword());
		testSignUpRequest.setUsername(testUser.getUsername());
		testSignUpRequest.setRole(new HashSet<>(Set.of("admin")));
		testSignUpRequest.setEmail(testUser.getEmail());
		this.mockMvc.perform(post("/api/v1/auth/signup").contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(testSignUpRequest))).andExpect(status().isOk());

	}

	@Test
	public void shouldCreateMod() throws Exception {
		User testUser = new User("test_mod", "mod_email@test.com", "Abs62Bxsad", "Mod name", "");
		SignupRequest testSignUpRequest = new SignupRequest();
		testSignUpRequest.setName(testUser.getName());
		testSignUpRequest.setPassword(testUser.getPassword());
		testSignUpRequest.setUsername(testUser.getUsername());
		testSignUpRequest.setRole(new HashSet<>(Set.of("mod")));
		testSignUpRequest.setEmail(testUser.getEmail());
		this.mockMvc.perform(post("/api/v1/auth/signup").contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(testSignUpRequest))).andExpect(status().isOk());

	}

	@Test
	public void shouldFailEmailExits() throws Exception {
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
	public void shouldFailUsernameExits() throws Exception {
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
	public void testLoginUser() throws Exception {
		LoginRequest testLoginRequest = new LoginRequest();
		testLoginRequest.setUsername("john_doe");
		testLoginRequest.setPassword("hashed_password");
		this.mockMvc.perform(post("/api/v1/auth/signin").contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(testLoginRequest))).andExpect(status().isOk());

	}

}
