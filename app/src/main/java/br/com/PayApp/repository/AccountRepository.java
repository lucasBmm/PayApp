package br.com.PayApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.PayApp.entity.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {
}
