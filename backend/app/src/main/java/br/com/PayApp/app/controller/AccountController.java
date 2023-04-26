package br.com.PayApp.app.controller;

import br.com.PayApp.app.entity.Account;
import br.com.PayApp.app.entity.User;
import br.com.PayApp.app.record.AmountRequest;
import br.com.PayApp.app.record.BalanceRecord;
import br.com.PayApp.app.services.AccountService;
import br.com.PayApp.app.services.UserService;
import br.com.PayApp.app.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.Optional;

@RestController
@RequestMapping("/rest/account")
public class AccountController {

    @Autowired
    AccountService accountService;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/balance")
    public ResponseEntity<?> getBalance(@RequestHeader("Authorization") String token) {
        String bearerPrefix = "Bearer ";
        if (token == null || !token.startsWith(bearerPrefix)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid token");
        }

        String jwtToken = token.substring(bearerPrefix.length());
        Optional<String> userEmailOptional = jwtUtil.extractUserEmailSafe(jwtToken);

        if (userEmailOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }

        String userEmail = userEmailOptional.get();
        Optional<User> userOptional = userService.findByEmail(userEmail);

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        User user = userOptional.get();
        Optional<Account> accountOptional = accountService.findByUserId(user.getId());

        if (accountOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Account not found");
        }

        Account account = accountOptional.get();
        BigDecimal balance = account.getBalance();
        String accountNumber = account.getAccountNumber();

        BalanceRecord balanceDto = new BalanceRecord(balance, accountNumber);

        return ResponseEntity.ok().body(balanceDto);
    }

    @PostMapping("/withdraw/{accountNumber}")
    public ResponseEntity<Account> withdraw(@PathVariable String accountNumber, @RequestBody AmountRequest request) {
        Account account = accountService.withdraw(accountNumber, request.amount());
        return ResponseEntity.ok(account);
    }

//    @PostMapping("/deposit")
    @PostMapping("/deposit")
    public ResponseEntity<Account> deposit(@RequestBody AmountRequest request, @RequestHeader("Authorization") String token) {
        // 1. Extract the user's email from the token
        String userEmail = jwtUtil.getEmailFromToken(token);

        // 2. Retrieve the user using the email address
        Optional<User> user = userService.findByEmail(userEmail);

        // 3. Get the user's account based on their ID and the account number provided
        Optional<Account> account = accountService.findAccountByUserId(user.get().getId());

        if (account.isPresent()) {
            // 4. Deposit the amount and update the account
            Account updatedAccount = accountService.deposit(account.get(), request.amount());

            return ResponseEntity.ok().build();
        }

        return ResponseEntity.notFound().build();
    }
}
