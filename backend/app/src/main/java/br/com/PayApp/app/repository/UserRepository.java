package br.com.PayApp.app.repository;

import br.com.PayApp.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    boolean existsByEmail(String email);

    UserDetails findByName(String username);

//    UserDetails findByEmail(String username);

    Optional<User> findByEmail(String email);
}

