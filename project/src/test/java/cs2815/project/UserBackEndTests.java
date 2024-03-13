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
        List<User> users = usi.refreshUser();
    
        // Creating User objects and adding them to the array
        List<User> expected_users = new ArrayList<User>();
        expected_users.add(new User(1, "BaseViewer", "Viewer", "Smith", "$2a$10$RvqfkX9AO8DNjqC0X76QruhNh4Ydo/Hd5jSGXrIDHtSTE9QuyLzOi", "Viewer"));
        expected_users.add(new User(2, "BaseUser", "User", "Martinez", "$2a$10$DZ.h7Vu.D2CHp2XB/XpkkeD4ovhT7PEcAX9K3P4MpoM0lhGBMYR7q", "User"));
        expected_users.add(new User(3, "BaseAdmin", "Admin", "Johnson", "$2a$10$0UFTgHWL7qpm2h45eQPer.UFmUQO7wbJFVbfU9PhSXrbWAaEqJbzm", "Admin"));
        
        // Compare the contents of the two lists
        for (int i = 0; i < 3; i++) {
            assert(users.get(i).equals(expected_users.get(i)));
        }

        // Testing from axios
    }

    @Test
    void test2() {
        List<User> searched_users;
        List<User> expected_users = new ArrayList<User>();
        // Testing if we can search users using the username.
        // Testing exact match for one
        searched_users = usi.searchByUsername("BaseViewer");
        expected_users.add(new User(1, "BaseViewer", "Viewer", "Smith", "$2a$10$RvqfkX9AO8DNjqC0X76QruhNh4Ydo/Hd5jSGXrIDHtSTE9QuyLzOi", "Viewer"));
        assert(searched_users.get(0).equals(expected_users.get(0)));
        expected_users.clear();

        // Testing similar match for one
        searched_users = usi.searchByUsername("View");
        expected_users.add(new User(1, "BaseViewer", "Viewer", "Smith", "$2a$10$RvqfkX9AO8DNjqC0X76QruhNh4Ydo/Hd5jSGXrIDHtSTE9QuyLzOi", "Viewer"));
        assert(searched_users.get(0).equals(expected_users.get(0)));
        expected_users.clear();

        // Testing similar match for all
        searched_users = usi.searchByUsername("Base");
        expected_users.add(new User(1, "BaseViewer", "Viewer", "Smith", "$2a$10$RvqfkX9AO8DNjqC0X76QruhNh4Ydo/Hd5jSGXrIDHtSTE9QuyLzOi", "Viewer"));
        expected_users.add(new User(2, "BaseUser", "User", "Martinez", "$2a$10$DZ.h7Vu.D2CHp2XB/XpkkeD4ovhT7PEcAX9K3P4MpoM0lhGBMYR7q", "User"));
        expected_users.add(new User(3, "BaseAdmin", "Admin", "Johnson", "$2a$10$0UFTgHWL7qpm2h45eQPer.UFmUQO7wbJFVbfU9PhSXrbWAaEqJbzm", "Admin"));
        for (int i = 0; i < 3; i++) {
            assert(searched_users.get(i).equals(expected_users.get(i)));
        }
        expected_users.clear();
    }

    @Test
    void test3() {
        // Testing filter search
    }

    @Test
    void test4() {
        // Testing creation and deletion of users
    }

    @Test
    void test5() {
        // Testing sorting alphabetically
    }

    @Test
    void test6() {
        // Testing editing of users
    }
}
