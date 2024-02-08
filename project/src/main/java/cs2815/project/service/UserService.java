package cs2815.project.service;

import java.util.List;

import cs2815.project.model.User;

public interface UserService {

    void createBaseUsers();

    void registerUser(User user);

    boolean logIn(User user);

    String getUserRole(String username);

    void editUser(User user);

    void deleteUser(int userId);

    List<User> refreshUser();

    List<String> searchByUsername(String searchString);

    List<String> searchByFirstName(String searchString);

    List<String> searchByLastName(String searchString);

    void resetPassword(int userId, String newPassword);

}
