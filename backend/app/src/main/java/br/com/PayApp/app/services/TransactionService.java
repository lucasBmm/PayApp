package br.com.PayApp.app.services;

import br.com.PayApp.app.entity.Account;
import br.com.PayApp.app.entity.Transaction;
import br.com.PayApp.app.entity.TransactionType;
import br.com.PayApp.app.exception.AccountNotFoundException;
import br.com.PayApp.app.exception.TransactionException;
import br.com.PayApp.app.record.TransactionRequest;
import br.com.PayApp.app.repository.TransactionRepository;
import br.com.PayApp.app.utils.TransactionSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final AccountService accountService;

    private final ScheduledExecutorService executorService = Executors.newScheduledThreadPool(1);

    public TransactionService(TransactionRepository transactionRepository, AccountService accountService) {
        this.transactionRepository = transactionRepository;
        this.accountService = accountService;
    }

    public Transaction createTransaction(TransactionRequest transactionRequest) {
        Account fromAccount = accountService.findAccountByAccountNumber(String.valueOf(transactionRequest.sourceAccount()));
        Account toAccount = accountService.findAccountByAccountNumber(String.valueOf(transactionRequest.destinationAccount()));
        BigDecimal amount = transactionRequest.amount();
        TransactionType type = transactionRequest.transactionType();

        if (fromAccount.getBalance().compareTo(transactionRequest.amount()) < 0) {
            throw new TransactionException("Insufficient balance in the account");
        }

        if (type == TransactionType.PIX) {
            executeTransaction(fromAccount, toAccount, amount);
        } else if (type == TransactionType.BANK_TRANSFER) {
            executorService.schedule(() -> executeTransaction(fromAccount, toAccount, amount), 5, TimeUnit.MINUTES);
        }

        Transaction transaction = new Transaction(fromAccount, toAccount, transactionRequest.amount(), transactionRequest.transactionType());

        return transactionRepository.save(transaction);
    }

    private void executeTransaction(Account fromAccount, Account toAccount, BigDecimal amount) {
        fromAccount.setBalance(fromAccount.getBalance().subtract(amount));
        toAccount.setBalance(toAccount.getBalance().add(amount));

        accountService.save(fromAccount);
        accountService.save(toAccount);
    }

    public Page<Transaction> getTransactions(Account account, Pageable pageable) {
        TransactionSpecification specification = new TransactionSpecification(account);
        return transactionRepository.findAll(specification, pageable);
    }
}

