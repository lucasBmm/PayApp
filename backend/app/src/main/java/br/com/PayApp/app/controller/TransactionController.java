package br.com.PayApp.app.controller;

import br.com.PayApp.app.entity.Account;
import br.com.PayApp.app.entity.Transaction;
import br.com.PayApp.app.record.TransactionRequest;
import br.com.PayApp.app.services.AccountService;
import br.com.PayApp.app.services.TransactionService;
import br.com.PayApp.app.services.UserService;
import br.com.PayApp.app.utils.JwtUtil;
import br.com.PayApp.app.utils.SortUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/rest/transactions")
public class TransactionController {
    @Autowired
    private UserService userService;
    @Autowired
    private AccountService accountService;
    @Autowired
    private TransactionService transactionService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping
    public ResponseEntity<?> createTransaction(@RequestBody TransactionRequest transactionRequest, @RequestHeader("Authorization") String token) {
        String jwtToken = token.substring(7);

        if (jwtUtil.validateToken(jwtToken)) {
            if (transactionRequest.amount().compareTo(BigDecimal.ZERO) <= 0) {
                return ResponseEntity.badRequest().body("Transaction value must be greater than zero");
            }

            if (transactionRequest.sourceAccount().equals(transactionRequest.destinationAccount())) {
                return ResponseEntity.badRequest().body("Cannot transfer to same account");
            }

            Transaction transaction = transactionService.createTransaction(transactionRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(transaction);
        } else {
            return ResponseEntity.badRequest().body("Invalid or expired token");
        }
    }

    @GetMapping
    public ResponseEntity<Page<Transaction>> getTransactions(
            @RequestParam(required = true) String accountNumber,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "transactionDate,desc") String[] sort) {

        Account account = accountNumber != null ? accountService.findAccountByAccountNumber(accountNumber) : null;

        Pageable pageable = PageRequest.of(page, size, Sort.by(SortUtils.parseSortOrders(sort)));
        Page<Transaction> transactions = transactionService.getTransactions(account, pageable);

        return ResponseEntity.ok(transactions);
    }
}

