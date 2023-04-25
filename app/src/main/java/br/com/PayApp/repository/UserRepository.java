package br.com.PayApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.PayApp.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
}

