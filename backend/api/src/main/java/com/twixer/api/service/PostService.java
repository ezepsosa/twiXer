package com.twixer.api.service;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.twixer.api.entity.Post;
import com.twixer.api.entity.User;
import com.twixer.api.entity.payload.request.PostRequest;
import com.twixer.api.entity.payload.response.Trend;
import com.twixer.api.repository.PostRepository;
import com.twixer.api.repository.UserRepository;
import com.twixer.api.security.jwt.JwtUtils;

import jakarta.servlet.http.Cookie;
import jakarta.validation.Valid;

@Service
public class PostService {

	private static final String ACCESS_COOKIE = "accessToken";

	@Autowired
	private PostRepository postRepository;

	@Autowired
	private JwtUtils jwtUtils;

	@Autowired
	private UserRepository userRepository;

	private User getUserFromCookie(Cookie[] cookies) {
		return Arrays.stream(cookies).filter(cookie -> cookie.getName().equals(ACCESS_COOKIE)).findFirst()
				.map(Cookie::getValue).map(jwtUtils::extractUsername).map(userRepository::findByUsername).get()
				.orElseThrow(() -> new IllegalArgumentException("User from token not found"));
	}

	public List<Post> getAllPosts() {
		return this.postRepository.findAll();
	}

	public List<Post> getPostsOrderedByDate() {
		return this.postRepository.findAllByOrderByDateAsc();
	}

	public Set<Post> getRecentPostsFromFollowers(Cookie[] cookies) {
		return Arrays.stream(cookies).filter(cookie -> cookie.getName().equals(ACCESS_COOKIE)).findFirst()
				.map(Cookie::getValue).map(jwtUtils::extractUsername).map(postRepository::findRandomPostFromFollowers)
				.orElse(Set.of());
	}

	public Post addNewPost(@Valid PostRequest postRequest, Cookie[] cookies) {
		User user = getUserFromCookie(cookies);
		Post post = new Post(user, postRequest.getText(), postRequest.getMedia());
		postRepository.save(post);
		return post;
	}

	public void addRepost(Long id, Cookie[] cookies) {
		User user = getUserFromCookie(cookies);
		Optional<Post> optionaPost = postRepository.findById(id);
		if (optionaPost.isPresent()) {
			Post post = optionaPost.get();
			Set<User> postReposteddBy = post.getRepostBy();
			postReposteddBy.add(user);
			post.setRepostBy(postReposteddBy);
			postRepository.save(post);
		} else {
			throw new IllegalArgumentException("Post with id " + id + " not found");
		}
	}

	public void deleteRepost(Long id, Cookie[] cookies) {
		User user = getUserFromCookie(cookies);
		Optional<Post> optionaPost = postRepository.findById(id);
		if (optionaPost.isPresent()) {
			Post post = optionaPost.get();
			Set<User> postReposteddBy = post.getRepostBy();
			postReposteddBy.remove(user);
			post.setRepostBy(postReposteddBy);
			postRepository.save(post);
		} else {
			throw new IllegalArgumentException("Post with id " + id + " not found");
		}
	}

	public Set<Post> getRepostsFromUserFromCookie(Cookie[] cookies) {
		User user = getUserFromCookie(cookies);
		return postRepository.findAll().stream().filter(post -> post.getRepostBy().contains(user))
				.collect(Collectors.toSet());
	}

	public void addFavorite(Long id, Cookie[] cookies) {
		User user = getUserFromCookie(cookies);
		Optional<Post> optionaPost = postRepository.findById(id);
		if (optionaPost.isPresent()) {
			Post post = optionaPost.get();
			Set<User> postLikedBy = post.getLikedBy();
			postLikedBy.add(user);
			post.setLikedBy(postLikedBy);
			postRepository.save(post);
		} else {
			throw new IllegalArgumentException("Post with id " + id + " not found");
		}
	}

	public void deleteFavorite(Long id, Cookie[] cookies) {
		User user = getUserFromCookie(cookies);
		Optional<Post> optionaPost = postRepository.findById(id);
		if (optionaPost.isPresent()) {
			Post post = optionaPost.get();
			Set<User> postLikedBy = post.getLikedBy();
			postLikedBy.remove(user);
			post.setLikedBy(postLikedBy);
			postRepository.save(post);
		} else {
			throw new IllegalArgumentException("Post with id " + id + " not found");
		}
	}

	public Set<Post> getFavoriteFromUserFromCookie(Cookie[] cookies) {
		User user = getUserFromCookie(cookies);
		return postRepository.findAll().stream().filter(post -> post.getLikedBy().contains(user))
				.collect(Collectors.toSet());
	}

	public LinkedHashSet<Trend> calculateTrends() {
		Set<String> stopWords = getStopWords().stream().map(word -> word.toLowerCase()).map(word -> word.replaceAll(
				"[\\d,!\\@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?\r\n\u2018\u2019\u201C\u201D\uD83C-\uDBFF\uDC00-\uDFFF]+",
				"")).collect(Collectors.toSet());

		List<String> postTexts = postRepository.calculateTrends(LocalDateTime.now().minus(1, ChronoUnit.DAYS),
				LocalDateTime.now());
		Map<String, Long> wordCount = Arrays.stream(postTexts.stream().collect(Collectors.joining(", ")).replaceAll(
				"[\\d,!\\@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?\r\n\u2018\u2019\u201C\u201D\uD83C-\uDBFF\uDC00-\uDFFF]+",
				"").split(" ")).filter(word -> !stopWords.contains(word.toLowerCase()) && word != "")
				.collect(Collectors.groupingBy(word -> word, Collectors.counting()));
		return wordCount.entrySet().stream().map(entry -> new Trend(entry.getKey(), entry.getValue()))
				.sorted((trend1, trend2) -> trend2.getPostCount().compareTo(trend1.getPostCount()))
				.collect(Collectors.toCollection(LinkedHashSet::new));
	}

	@SuppressWarnings("unchecked")
	private Set<String> getStopWords() {
		ObjectMapper objectMapper = new ObjectMapper();
		Set<String> res = new HashSet<String>();
		try {
			res = objectMapper.readValue(new File("src/main/resources/stopwords.json"), Set.class);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return res;
	}

}
