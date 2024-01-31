package cs2815.project.service.implementations;

import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cs2815.project.model.User;
import cs2815.project.repo.UserRepo;
import cs2815.project.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo repo;

    @Override
    public void registerUser(User user) {
<<<<<<< HEAD:project/src/main/java/cs2815/project/service/UserServiceImpl.java
        Objects.requireNonNull(user, "User must not be null");
=======
        if (user == null) {
            System.out.println("Error: User is null.");
            return;
        }
>>>>>>> backend:project/src/main/java/cs2815/project/service/Implementations/UserServiceImpl.java
        repo.save(user);
    }

    @Override
    public boolean logIn(User user) {
        User existingUser = repo.findByUserName(user.getUser_name());

        return existingUser != null && existingUser.getUser_password().equals(user.getUser_password());
    }

    @Override
    public String getUserRole(String username) {
        User user = repo.findByUserName(username);
        return user != null ? user.getUser_role() : null;
    }

}
