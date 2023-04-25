package br.com.PayApp.app.repository;

import br.com.PayApp.app.entity.Account;
import br.com.PayApp.app.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Integer>, JpaSpecificationExecutor<Transaction> {
    List<Transaction> findAllBySourceAccountOrDestinationAccount(Account sourceAccount, Account destinationAccount);
}

