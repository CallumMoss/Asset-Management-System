package cs2815.project.service;

import java.util.List;

import cs2815.project.model.User;

public interface UserService {

    public void createBaseUsers();

    public void registerUser(User user);

    public boolean logIn(User user);

    public String getUserRole(String username);

    public void editUser(User user);

    public void deleteUser(int userId);

    public List<User> refreshUser();

    public List<String> searchByUsername(String searchword);

    public void resetPassword(int userId, String newPassword);

}
