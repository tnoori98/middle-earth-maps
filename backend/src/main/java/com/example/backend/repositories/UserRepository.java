package com.example.backend.repositories;

import com.example.backend.models.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * The persistence layer for the user entity
 */

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    boolean existsByUsernameOrEmail(String username, String email);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    User getUserByUsername(String username);
    Optional<User> findUserByUsername(String username);
    Optional<User> findUserByEmail(String email);
}
