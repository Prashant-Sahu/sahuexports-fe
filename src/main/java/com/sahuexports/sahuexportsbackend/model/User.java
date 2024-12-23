package com.sahuexports.sahuexportsbackend.model;

import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class User {
    @NonNull
    private String username;

    @NonNull
    private String password;

    @Nullable
    private String email;
}
