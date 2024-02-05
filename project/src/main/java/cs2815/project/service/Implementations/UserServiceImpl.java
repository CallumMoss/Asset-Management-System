package cs2815.project.service.Implementations;

import java.util.List;
import java.util.ArrayList;

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

    @Override
    public void editUser(User user) {
        repo.updateUserFieldsById(user.getId(), user.getUser_name(), user.getUser_first_name(),
                user.getUser_last_name(), user.getUser_role());
    }

    @Override
    public void deleteUser(int userId) {
        repo.deleteById(userId);
    }

    @Override
    public void resetPassword(int userId, String newPassword) {

        repo.resetPassword(userId, key.encode(newPassword));
    }

    @Override
    public List<User> refreshUser() {
        return repo.getAllUsers();
    }

    @Override
    public List<String> searchByUsername(String searchString) {
        System.out.println("test1");
        List<String> usernameList = repo.findAllUserNames();
        List<String> compatibleList = new ArrayList<>();
        for (String username : usernameList) {
            System.out.println(username);
            if (isSimilar(searchString, username)) {
                System.out.println("test2");
                compatibleList.add(username);
            }
        }
        return compatibleList;
    }

    public boolean isSimilar(String searchString, String compareString) {
        System.out.println(compareString.toLowerCase().contains(searchString.toLowerCase()));
        return compareString.toLowerCase().contains(searchString.toLowerCase());
    }

}
