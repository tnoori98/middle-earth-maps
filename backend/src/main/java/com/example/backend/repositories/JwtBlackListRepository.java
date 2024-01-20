package com.example.backend.repositories;

import com.example.backend.models.JwtBlackList;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * The persistence layer for the jwt-blacklist entity
 */

@Repository
public interface JwtBlackListRepository extends CrudRepository<JwtBlackList, Long> {
    boolean existsByJwtToken(String jwtToken);
}