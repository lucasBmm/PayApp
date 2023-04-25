package br.com.PayApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.PayApp.dto.UserDTO;
import br.com.PayApp.entity.User;
import br.com.PayApp.services.UserService;


@RestController
public class UserController {

	// Add UserService
	@Autowired
	private UserService userService;
	
	@GetMapping("/user")
	public String hello() {
		return "Hello, world";
	}

	// Update createUser method
	@PostMapping
	public ResponseEntity<User> createUser(@Validated @RequestBody UserDTO userDTO) {
	    User createdUser = userService.createUser(userDTO);
	    return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
	}

}
