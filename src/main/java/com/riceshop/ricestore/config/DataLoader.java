package com.riceshop.ricestore.config;

import com.riceshop.ricestore.entity.User;
import com.riceshop.ricestore.entity.enums.Role;
import com.riceshop.ricestore.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataLoader implements CommandLineRunner {
    // Thêm final để sử dụng với @RequiredArgsConstructor
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        loadUsers();
    }

    private void loadUsers() {
        if(userRepository.count() == 0) {
            try {
                // create Admin user
                User adminUser = User.builder()
                        .username("admin")  // Loại bỏ dòng trùng lặp
                        .email("admin@gmail.com")
                        .password(passwordEncoder.encode("admin"))
                        .fullName("I am admin")
                        .role(Role.ROLE_ADMIN)
                        .build();

                userRepository.save(adminUser);
                log.info("Sample Admin loaded with : Username : " + adminUser.getUsername() + " , Password : admin");
            } catch (Exception e) {
                log.error("Failed to load roles", e);
            }
        }
    }
}