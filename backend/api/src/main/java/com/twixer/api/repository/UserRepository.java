package com.twixer.api.repository;

import java.util.Optional;
import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.twixer.api.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	
	Optional<User> findByUsername(String username);
	
	Boolean existsByUsername(String username);
	
	Boolean existsByEmail(String email);
	
	@Query("SELECT u FROM User u WHERE u.username NOT IN (SELECT f.username FROM User user JOIN user.followings f WHERE user.username = :username)")
	Set<User> findRandomUsersToFollow(String username);
	
}
