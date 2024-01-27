package cs2815.project.service;

import cs2815.project.model.User;

public interface UserService {

    public void registerUser(User user);

    public boolean logIn(User user);

}
