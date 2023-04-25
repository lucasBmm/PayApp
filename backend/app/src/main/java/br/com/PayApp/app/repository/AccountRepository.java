package br.com.PayApp.app.repository;

import br.com.PayApp.app.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {
    boolean existsByAccountNumber(String accountNumber);

    Account findByAccountNumber(String number);
}