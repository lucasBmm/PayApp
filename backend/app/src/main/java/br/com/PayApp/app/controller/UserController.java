package br.com.PayApp.app.controller;

import br.com.PayApp.app.entity.User;
import br.com.PayApp.app.record.JwtResponse;
import br.com.PayApp.app.record.UserLoginRequest;
import br.com.PayApp.app.record.UserRecord;
import br.com.PayApp.app.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    // Add UserService
    @Autowired
    private UserService userService;

    private final AuthenticationManager authenticationManager;

    public UserController(UserService userService, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
    }

    @GetMapping("/user")
    public String hello() {
        return "Hello, world";
    }

    // Update createUser method
    @PostMapping("/user")
    public ResponseEntity<User> createUser(@Validated @RequestBody UserRecord userDTO) {
        User createdUser = userService.createUser(userDTO);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity efetuarLogin(@RequestBody @Valid UserLoginRequest dados) {
        var token = new UsernamePasswordAuthenticationToken(dados.email(), dados.password());
        var authentication = authenticationManager.authenticate(token);

        return ResponseEntity.ok().build();
    }

//    @PostMapping("/authenticate")
//    public ResponseEntity<?> authenticate(@RequestBody UserLoginRequest loginRequest) {
//        try {
//            Authentication authentication = authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(loginRequest.email(), loginRequest.password()));
//
//
//            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
//            String token = jwtUtil.generateToken(userDetails.getUsername());
//            return ResponseEntity.ok(new JwtResponse(token));
//        } catch (AuthenticationException e) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
//        }
//    }
}

