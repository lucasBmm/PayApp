package br.com.PayApp.app.controller;

import br.com.PayApp.app.entity.User;
import br.com.PayApp.app.record.JwtResponse;
import br.com.PayApp.app.record.UserLoginRequest;
import br.com.PayApp.app.record.UserRecord;
import br.com.PayApp.app.services.UserService;
import br.com.PayApp.app.utils.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController("rest/")
public class UserController {

    // Add UserService
    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    private final AuthenticationManager authenticationManager;

    public UserController(UserService userService, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
    }

    @GetMapping("/user")
    public String hello() {
        return "Hello, world";
    }

    @GetMapping("/rest/user/test")
    public ResponseEntity<String> getEmailFromToken(@RequestHeader("Authorization") String token) {
        // Remove "Bearer " from the token
        String jwtToken = token.substring(7);

        if (jwtUtil.validateToken(jwtToken)) {
            String email = jwtUtil.getEmailFromToken(jwtToken);
            return ResponseEntity.ok(email);
        } else {
            return ResponseEntity.badRequest().body("Invalid or expired token");
        }
    }

    // Update createUser method
    @PostMapping("rest/user/register")
    public ResponseEntity createUser(@Validated @RequestBody UserRecord userDTO) {
        User createdUser = userService.createUser(userDTO);
        String token = jwtUtil.generateToken(createdUser.getEmail());

        return ResponseEntity.ok(new JwtResponse(token));
    }

    @PostMapping("rest/user/login")
    public ResponseEntity efetuarLogin(@RequestBody @Valid UserLoginRequest dados) {
        UserDetails userDetails;
        try {
            userDetails = userService.loadUserByEmail(dados.email());
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }

        if (new BCryptPasswordEncoder().matches(dados.password(), userDetails.getPassword())) {
            String token = jwtUtil.generateToken(dados.email());
            return ResponseEntity.ok(new JwtResponse(token));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
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

