package br.com.PayApp.app.controller;

import br.com.PayApp.app.entity.Account;
import br.com.PayApp.app.record.AmountRequest;
import br.com.PayApp.app.services.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/accounts")
public class AccountController {

    @Autowired
    AccountService accountService;

    @PostMapping("/withdraw/{accountNumber}")
    public ResponseEntity<Account> withdraw(@PathVariable String accountNumber, @RequestBody AmountRequest request) {
        Account account = accountService.withdraw(accountNumber, request.amount());
        return ResponseEntity.ok(account);
    }

    @PostMapping("/deposit/{accountNumber}")
    public ResponseEntity<Account> deposit(@PathVariable String accountNumber, @RequestBody AmountRequest request) {
        Account account = accountService.deposit(accountNumber, request.amount());
        return ResponseEntity.ok(account);
    }
}
