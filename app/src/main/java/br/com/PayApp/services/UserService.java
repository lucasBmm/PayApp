package br.com.PayApp.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.PayApp.dto.UserDTO;
import br.com.PayApp.entity.Account;
import br.com.PayApp.entity.User;
import br.com.PayApp.repository.AccountRepository;
import br.com.PayApp.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public User createUser(UserDTO userDTO) {
        User user = new User();
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));

        Account account = new Account();
        account.setUser(user);

        user.setAccount(account);

        userRepository.save(user);
        accountRepository.save(account);

        return user;
    }
}
