package br.com.PayApp.app.services;

import br.com.PayApp.app.entity.Account;
import br.com.PayApp.app.exception.AccountNotFoundException;
import br.com.PayApp.app.repository.AccountRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
public class AccountService {

    private final AccountRepository accountRepository;

    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public Account findAccountByAccountNumber(String accountNumber) {
        Account account = accountRepository.findByAccountNumber(accountNumber);

        if (account == null) {
            throw new AccountNotFoundException("Account not found with account number: " + accountNumber);
        }

        return account;
    }

    @Transactional
    public Account withdraw(String accountNumber, BigDecimal amount) {
        Account account = findAccountByAccountNumber(accountNumber);

        if (account.getBalance().compareTo(amount) < 0) {
            throw new IllegalArgumentException("Insufficient balance");
        }

        account.setBalance(account.getBalance().subtract(amount));
        return accountRepository.save(account);
    }

    @Transactional
    public Account deposit(String accountNumber, BigDecimal amount) {
        Account account = findAccountByAccountNumber(accountNumber);

        account.setBalance(account.getBalance().add(amount));
        return accountRepository.save(account);
    }

    public void save(Account fromAccount) {
        accountRepository.save((fromAccount));
    }
}
