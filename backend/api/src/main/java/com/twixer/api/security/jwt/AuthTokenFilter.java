package com.twixer.api.security.jwt;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.twixer.api.security.services.UserDetailsImpl;
import com.twixer.api.security.services.UserDetailsServiceImpl;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
@Component
public class AuthTokenFilter extends OncePerRequestFilter {

	@Autowired
	private JwtUtils jwtUtils;

	@Autowired
	private UserDetailsServiceImpl userDetailsService;

	private static final Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class);

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		String token = null;
		String username = null;

		if (request.getCookies() != null) {
			for (Cookie cookie : request.getCookies()) {
				if (cookie.getName().equals("accessToken")) {
					token = cookie.getValue();
				}
			}
		}
		if (token == null) {
			filterChain.doFilter(request, response);
			return;
		}
		username = jwtUtils.extractUsername(token);
		if (username != null) {
			UserDetails userDetails = userDetailsService.loadUserByUsername(username);
			if (jwtUtils.validateToken(token, userDetails)) {
				UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
						userDetails, null, userDetails.getAuthorities());
				authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(authenticationToken);
			}
		}
		filterChain.doFilter(request, response);
	}

	/*
	 * @Override protected void doFilterInternal(HttpServletRequest request,
	 * HttpServletResponse response, FilterChain filterChain) throws
	 * ServletException, IOException { try { String jwt = parseJwt(request); if (jwt
	 * != null && jwtUtils.validateJwtToken(jwt)) { String username =
	 * jwtUtils.getUserNameFromJwtToken(jwt);
	 * 
	 * UserDetails userDetails = userDetailsService.loadUserByUsername(username);
	 * UsernamePasswordAuthenticationToken authentication = new
	 * UsernamePasswordAuthenticationToken(userDetails, null,
	 * userDetails.getAuthorities()); authentication.setDetails(new
	 * WebAuthenticationDetailsSource().buildDetails(request));
	 * 
	 * SecurityContextHolder.getContext().setAuthentication(authentication); } }
	 * catch (Exception e) { logger.error("Cannot set user authentication: {}", e);
	 * }
	 * 
	 * filterChain.doFilter(request, response); }
	 * 
	 * private String parseJwt(HttpServletRequest request) { String headerAuth =
	 * request.getHeader("Authorization");
	 * 
	 * if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
	 * return headerAuth.substring(7, headerAuth.length()); }
	 * 
	 * return null; }
	 */

}
