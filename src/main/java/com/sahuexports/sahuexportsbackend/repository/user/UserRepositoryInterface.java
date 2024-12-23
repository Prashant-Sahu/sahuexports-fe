package com.sahuexports.sahuexportsbackend.repository.user;

import com.sahuexports.sahuexportsbackend.model.User;

public interface UserRepositoryInterface {
    void save(User user);
    User findByUserName(String userName);
}
