package br.com.PayApp.app.services;

import br.com.PayApp.app.entity.Account;
import br.com.PayApp.app.entity.Transaction;
import br.com.PayApp.app.entity.TransactionType;
import br.com.PayApp.app.entity.User;
import br.com.PayApp.app.record.UserRecord;
import br.com.PayApp.app.repository.AccountRepository;
import br.com.PayApp.app.repository.TransactionRepository;
import br.com.PayApp.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private AccountRepository accountRepository;

    private final Random random = new Random();

    @Transactional
    public User createUser(UserRecord userRecord) {

        if (userRepository.existsByEmail(userRecord.email())) {
            throw new IllegalArgumentException("Email already in use");
        }

        String encoded = new BCryptPasswordEncoder().encode(userRecord.password());
        // Create a new User entity
        User newUser = new User(userRecord.name(), userRecord.email(), encoded);

        // Generate a unique account number (use your desired implementation)
        String accountNumber = generateUniqueAccountNumber();

        // Create a new Account entity
        Account newAccount = new Account(accountNumber);

        newAccount.setUser(newUser);

        // Save the new account to the database
        accountRepository.save(newAccount);

        // Save the new user to the database
        userRepository.save(newUser);

        return newUser;
    }

    private String generateUniqueAccountNumber() {
        String accountNumber;
        do {
            accountNumber = String.format("%08d", random.nextInt(100000000));
        } while (accountRepository.existsByAccountNumber(accountNumber));
        return accountNumber;
    }

    public UserDetails loadUserByUsername(String username) {
        return userRepository.findByName(username);
    }

    public Transaction createTransaction(Long fromAccountId, Long toAccountId, BigDecimal amount, TransactionType type) {
        // Load the accounts involved in the transaction
        Account fromAccount = accountRepository.findById(Math.toIntExact(fromAccountId)).orElseThrow(() -> new IllegalArgumentException("From account not found"));
        Account toAccount = accountRepository.findById(Math.toIntExact(toAccountId)).orElseThrow(() -> new IllegalArgumentException("To account not found"));

        // Perform validations (e.g., check if the sender has sufficient balance)
        if (fromAccount.getBalance().compareTo(amount) < 0) {
            throw new IllegalArgumentException("Insufficient balance");
        }

        // Update account balances
        fromAccount.setBalance(fromAccount.getBalance().subtract(amount));
        toAccount.setBalance(toAccount.getBalance().add(amount));

        // Save the updated accounts
        accountRepository.save(fromAccount);
        accountRepository.save(toAccount);

        // Create a new transaction
        Transaction transaction = new Transaction(fromAccount, toAccount, amount, type);

        // Save the transaction
        return transactionRepository.save(transaction);
    }
}
