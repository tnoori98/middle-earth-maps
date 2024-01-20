package com.example.backend.services;

import com.example.backend.models.User;
import com.example.backend.repositories.UserRepository;
import com.example.backend.security.SpringUserDetails;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

/**
 * Wrapper for user details service
 */

@Service
public class SpringUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    public SpringUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User dbUser = userRepository.findUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

        return SpringUserDetails.build(dbUser);
    }
}
