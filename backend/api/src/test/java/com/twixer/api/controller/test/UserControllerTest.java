package com.twixer.api.controller.test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.twixer.api.entity.payload.request.LoginRequest;
import com.twixer.api.entity.payload.response.JwtResponse;

@AutoConfigureMockMvc
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@TestPropertySource("classpath:application-test.properties")
public class UserControllerTest {
	
	@Autowired
	private MockMvc mockMvc;
	
	@Autowired
	private ObjectMapper objectMapper;
	
	String bearerToken = "";
	
	@BeforeEach
	public void setup() throws Exception {
		LoginRequest testLoginRequest = new LoginRequest();
		testLoginRequest.setUsername("john_doe");
		testLoginRequest.setPassword("hashed_password");
		String JsonResponse = this.mockMvc.perform(post("/api/v1/auth/signin")
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(testLoginRequest)))
				.andReturn().getResponse().getContentAsString();
		JwtResponse jwtResponse = objectMapper.readValue(JsonResponse, JwtResponse.class);
		this.bearerToken = jwtResponse.getTokenType() + " " + jwtResponse.getAccessToken();
		
		
	}

	@Test
	public void shouldShowAllUsers() throws Exception{
	    this.mockMvc.perform(get("/api/v1/user/all")
	            .contentType(MediaType.APPLICATION_JSON)
	            .header("Authorization", bearerToken))
	            .andExpect(status().isOk());
	}
	
	@Test
	public void shouldShowAllFollowings() throws Exception{
	    MvcResult ssd = this.mockMvc.perform(get("/api/v1/user/1/following/all")
	            .contentType(MediaType.APPLICATION_JSON)
	            .header("Authorization", bearerToken))
	            .andExpect(status().isOk()).andReturn();
	    System.out.println(ssd);
	}


}
