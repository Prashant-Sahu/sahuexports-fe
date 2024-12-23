package com.sahuexports.sahuexportsbackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.sahuexports.sahuexportsbackend.model.User;
import com.sahuexports.sahuexportsbackend.repository.user.UserRepositoryInterface;

@Service
public class UserService {

    @Autowired
    @Qualifier("inMemoryUserRepository")
    private UserRepositoryInterface userRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    public boolean authenticateUser(String username, String password) {
        User user = findUserByUsername(username);
        if (user != null) {
            return passwordEncoder.matches(password, user.getPassword());
        }
        return false;
    }

    private User findUserByUsername(String username) {
        return userRepository.findByUserName(username);
    }
}
