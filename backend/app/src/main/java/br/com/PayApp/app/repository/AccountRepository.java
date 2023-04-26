package br.com.PayApp.app.repository;

import br.com.PayApp.app.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {
    boolean existsByAccountNumber(String accountNumber);

    Account findByAccountNumber(String number);

    Optional<Account> findByUserId(int id);

    Account findAccountByUserIdAndAccountNumber(int id, String accountNumber);
}