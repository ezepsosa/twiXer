package com.twixer.api.security;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.csrf.CsrfAuthenticationStrategy;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import com.twixer.api.security.jwt.AuthEntryPointJwt;
import com.twixer.api.security.jwt.AuthTokenFilter;
import com.twixer.api.security.jwt.JwtUtils;
import com.twixer.api.security.services.UserDetailsServiceImpl;

@Configuration
@EnableMethodSecurity
public class WebSecurityConfig { // extends WebSecurityConfigurerAdapter {
	@Autowired
	UserDetailsServiceImpl userDetailsService;

	@Autowired
	private AuthEntryPointJwt unauthorizedHandler;

	@Bean
	AuthTokenFilter AuthTokenFilter() {
		return new AuthTokenFilter();
	}

	@Bean
	DaoAuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

		authProvider.setUserDetailsService(userDetailsService);
		authProvider.setPasswordEncoder(passwordEncoder());

		return authProvider;
	}

	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
		return authConfig.getAuthenticationManager();
	}

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		return http.csrf(csrf -> csrf.disable())
				.authorizeHttpRequests(
						auth -> auth.requestMatchers("/api/v1/auth/**")
								.permitAll().anyRequest().authenticated())
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authenticationProvider(authenticationProvider())
				.addFilterBefore(AuthTokenFilter(), UsernamePasswordAuthenticationFilter.class).build();
	}
	/*
	 * @Bean SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
	 * http.csrf(csrf -> csrf.disable()) // Deshabilitar CSRF
	 * .exceptionHandling(exception ->
	 * exception.authenticationEntryPoint(unauthorizedHandler)) // Manejo de //
	 * excepciones .sessionManagement(session ->
	 * session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Sin //
	 * estado .authorizeHttpRequests(auth ->
	 * auth.requestMatchers("/api/v1/auth/**").permitAll() // Permitir acceso a //
	 * auth .requestMatchers("/api/v1/test/**").permitAll() // Permitir acceso a
	 * test .anyRequest().authenticated()) // Autenticación para cualquier otra
	 * solicitud .cors(cors -> cors.configurationSource(corsConfigurationSource()));
	 * // Configuración de CORS
	 * 
	 * http.authenticationProvider(authenticationProvider());
	 * http.addFilterBefore(authenticationJwtTokenFilter(),
	 * UsernamePasswordAuthenticationFilter.class);
	 * 
	 * return http.build(); }
	 * 
	 * // Configuración global de CORS
	 * 
	 * @Bean CorsFilter corsFilter() { UrlBasedCorsConfigurationSource source = new
	 * UrlBasedCorsConfigurationSource(); CorsConfiguration config = new
	 * CorsConfiguration(); config.setAllowCredentials(true);
	 * config.setAllowedOrigins(Arrays.asList("http://localhost:5173",
	 * "http://localhost:3000")); config.setAllowedHeaders(Arrays.asList("*"));
	 * config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE",
	 * "OPTIONS")); source.registerCorsConfiguration("/**", config); return new
	 * CorsFilter(source); }
	 * 
	 * private CorsConfigurationSource corsConfigurationSource() { CorsConfiguration
	 * configuration = new CorsConfiguration();
	 * configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173",
	 * "http://localhost:3000"));
	 * configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE",
	 * "OPTIONS")); configuration.setAllowCredentials(true);
	 * configuration.setAllowedHeaders(Arrays.asList("*"));
	 * UrlBasedCorsConfigurationSource source = new
	 * UrlBasedCorsConfigurationSource(); source.registerCorsConfiguration("/**",
	 * configuration); return source; }
	 */
}
