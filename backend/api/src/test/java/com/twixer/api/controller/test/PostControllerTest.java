package com.twixer.api.controller.test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;
import java.util.Set;

import org.hibernate.mapping.Map;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.web.bind.annotation.GetMapping;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.twixer.api.entity.Post;
import com.twixer.api.entity.payload.request.LoginRequest;
import com.twixer.api.entity.payload.response.JwtResponse;

import jakarta.servlet.http.Cookie;

@AutoConfigureMockMvc
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@TestPropertySource("classpath:application-test.properties")
public class PostControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private ObjectMapper objectMapper;

	Cookie cookie = null;

	@BeforeEach
	public void setup() throws Exception {
		LoginRequest testLoginRequest = new LoginRequest();
		testLoginRequest.setUsername("john_doe");
		testLoginRequest.setPassword("hashed_password");
		MockHttpServletResponse testLoginResponse = this.mockMvc.perform(post("/api/v1/auth/signin")
				.contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(testLoginRequest)))
				.andReturn().getResponse();
		this.cookie = testLoginResponse.getCookie("accessToken");

	}

	@Test
	public void shouldShowAllUsers() throws Exception {
		this.mockMvc.perform(get("/api/v1/post/all").contentType(MediaType.APPLICATION_JSON).cookie(this.cookie))
				.andExpect(status().isOk());
	}

	@Test
	public void shouldShowAllFollowings() throws Exception {
		this.mockMvc.perform(get("/api/v1/post/recent").contentType(MediaType.APPLICATION_JSON).cookie(this.cookie))
				.andExpect(status().isOk());
	}

}