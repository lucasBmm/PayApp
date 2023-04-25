package br.com.PayApp.app.record;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserRecord (
        @NotBlank(message = "Name is mandatory")
        @Size(min = 3, max = 255, message = "Name must be between 3 and 255 characters")
        String name,
        @NotBlank(message = "Email is mandatory")
        @Email(message = "Invalid email format")
        String email,
        @NotBlank(message = "Password is mandatory")
        String password
) {}

