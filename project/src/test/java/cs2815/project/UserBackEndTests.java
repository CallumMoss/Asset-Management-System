package cs2815.project;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Assertions;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import cs2815.project.controller.UserController;
import cs2815.project.model.User;
import cs2815.project.repo.UserRepo;
import cs2815.project.service.Implementations.UserServiceImpl;

// Tests are designed for the base database
@SpringBootTest
class UserBackEndTests {

    @Autowired
    private UserRepo ur;

    @Autowired
    private UserController uc;

    @Autowired
    private UserServiceImpl usi;

    /**
     * Testing getAllUsers().
     */
    @Test
    void test1() {
        // Testing if we can get all users from the database.
        List<User> refreshedUsers = ur.getAllUsers();
    
        // Creating User objects and adding them to the array
        List<User> users = new ArrayList<User>();
        users.add(new User(1, "BaseViewer", "Viewer", "Smith", "$2a$10$RvqfkX9AO8DNjqC0X76QruhNh4Ydo/Hd5jSGXrIDHtSTE9QuyLzOi", "Viewer"));
        users.add(new User(2, "BaseUser", "User", "Martinez", "$2a$10$DZ.h7Vu.D2CHp2XB/XpkkeD4ovhT7PEcAX9K3P4MpoM0lhGBMYR7q", "User"));
        users.add(new User(3, "BaseAdmin", "Admin", "Johnson", "$2a$10$0UFTgHWL7qpm2h45eQPer.UFmUQO7wbJFVbfU9PhSXrbWAaEqJbzm", "Admin"));
        
        // Compare the contents of the two lists
        for (int i = 0; i < 3; i++) {
            assert(users.get(i).equals(refreshedUsers.get(i)));
        }
    }
}
