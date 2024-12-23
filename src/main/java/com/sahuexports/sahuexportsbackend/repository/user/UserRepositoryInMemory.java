package com.sahuexports.sahuexportsbackend.repository.user;

import com.sahuexports.sahuexportsbackend.model.User;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Repository;

@Repository("inMemoryUserRepository")
public class UserRepositoryInMemory implements UserRepositoryInterface {
    private Map<String, User> userMap = new HashMap<>();

    @Override
    public void save(User user) {
        userMap.put(user.getUsername(), user);
    }

    @Override
    public User findByUserName(String userName) {
        return userMap.get(userName);
    }

}
