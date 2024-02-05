package cs2815.project.service.Implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import cs2815.project.model.User;
import cs2815.project.repo.UserRepo;
import cs2815.project.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo repo;

    @Autowired
    private PasswordEncoder key;

    @Override
    public void registerUser(User user) {
        if (user == null) {
            System.out.println("Error: User is null.");
            return;
        }
        user.encryptPassword(key);
        repo.save(user);
    }

    @Override
    public boolean logIn(User user) {
        User existingUser = repo.findByUserName(user.getUser_name());
        return existingUser != null && key.matches(user.getUser_password(), existingUser.getUser_password());
    }

    @Override
    public String getUserRole(String username) {
        User user = repo.findByUserName(username);
        return user != null ? user.getUser_role() : null;
    }

}
