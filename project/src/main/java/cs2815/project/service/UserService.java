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

    User findUser(String userName);

    List<User> refreshUser();

    List<User> searchByUsername(String searchString);

    List<User> searchByFirstName(String searchString);

    List<User> searchByLastName(String searchString);

    List<User> searchByRole(String searchString);

    void resetPassword(String userName, String user_role, String newPassword);

    List<User> sortAlphabetically(List<User> unsortedUsers, String orderBy);
}
