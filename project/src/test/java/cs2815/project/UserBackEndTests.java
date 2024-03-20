package cs2815.project;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Assertions;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

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

    // Testing working cases
    @Test
    void test1() {
        // Testing if we can get all users from the database.
        List<User> users = usi.refreshUser();

        // Creating User objects and adding them to the array
        List<User> expected_users = new ArrayList<User>();
        expected_users.add(new User(1, "BaseViewer", "Viewer", "Smith",
                "$2a$10$RvqfkX9AO8DNjqC0X76QruhNh4Ydo/Hd5jSGXrIDHtSTE9QuyLzOi", "Viewer"));
        expected_users.add(new User(2, "BaseUser", "User", "Martinez",
                "$2a$10$DZ.h7Vu.D2CHp2XB/XpkkeD4ovhT7PEcAX9K3P4MpoM0lhGBMYR7q", "User"));
        expected_users.add(new User(3, "BaseAdmin", "Admin", "Johnson",
                "$2a$10$0UFTgHWL7qpm2h45eQPer.UFmUQO7wbJFVbfU9PhSXrbWAaEqJbzm", "Admin"));

        // Compare the contents of the two lists
        for (int i = 0; i < 3; i++) {
            assert (users.get(i).equals(expected_users.get(i)));
        }
    }

    @Test
    void test2() {
        // Testing deafault search (by username)
        List<User> searched_users;
        List<User> expected_users = new ArrayList<User>();
        // Testing exact match for one
        searched_users = usi.searchByUsername("BaseViewer");
        expected_users.add(new User(1, "BaseViewer", "Viewer", "Smith",
                "$2a$10$RvqfkX9AO8DNjqC0X76QruhNh4Ydo/Hd5jSGXrIDHtSTE9QuyLzOi", "Viewer"));
        assert (searched_users.get(0).equals(expected_users.get(0)));
        expected_users.clear();

        // Testing similar match for one
        searched_users = usi.searchByUsername("View");
        expected_users.add(new User(1, "BaseViewer", "Viewer", "Smith",
                "$2a$10$RvqfkX9AO8DNjqC0X76QruhNh4Ydo/Hd5jSGXrIDHtSTE9QuyLzOi", "Viewer"));
        assert (searched_users.get(0).equals(expected_users.get(0)));
        expected_users.clear();

        // Testing similar match for all
        searched_users = usi.searchByUsername("Base");
        expected_users.add(new User(1, "BaseViewer", "Viewer", "Smith",
                "$2a$10$RvqfkX9AO8DNjqC0X76QruhNh4Ydo/Hd5jSGXrIDHtSTE9QuyLzOi", "Viewer"));
        expected_users.add(new User(2, "BaseUser", "User", "Martinez",
                "$2a$10$DZ.h7Vu.D2CHp2XB/XpkkeD4ovhT7PEcAX9K3P4MpoM0lhGBMYR7q", "User"));
        expected_users.add(new User(3, "BaseAdmin", "Admin", "Johnson",
                "$2a$10$0UFTgHWL7qpm2h45eQPer.UFmUQO7wbJFVbfU9PhSXrbWAaEqJbzm", "Admin"));
        for (int i = 0; i < 3; i++) {
            assert (searched_users.get(i).equals(expected_users.get(i)));
        }
        expected_users.clear();
    }

    @Test
    void test3() {
        // Testing first name filter search
        List<User> searched_users;
        List<User> expected_users = new ArrayList<User>();
        // Testing exact match for one
        searched_users = usi.searchByFirstName("Viewer");
        expected_users.add(new User(1, "BaseViewer", "Viewer", "Smith",
                "$2a$10$RvqfkX9AO8DNjqC0X76QruhNh4Ydo/Hd5jSGXrIDHtSTE9QuyLzOi", "Viewer"));
        assert (searched_users.get(0).equals(expected_users.get(0)));
        expected_users.clear();

        // Testing similar match for one
        searched_users = usi.searchByFirstName("View");
        expected_users.add(new User(1, "BaseViewer", "Viewer", "Smith",
                "$2a$10$RvqfkX9AO8DNjqC0X76QruhNh4Ydo/Hd5jSGXrIDHtSTE9QuyLzOi", "Viewer"));
        assert (searched_users.get(0).equals(expected_users.get(0)));
        expected_users.clear();

        // Testing similar match for multiple and caps insensitive
        searched_users = usi.searchByFirstName("ER");
        expected_users.add(new User(1, "BaseViewer", "Viewer", "Smith",
                "$2a$10$RvqfkX9AO8DNjqC0X76QruhNh4Ydo/Hd5jSGXrIDHtSTE9QuyLzOi", "Viewer"));
        expected_users.add(new User(2, "BaseUser", "User", "Martinez",
                "$2a$10$DZ.h7Vu.D2CHp2XB/XpkkeD4ovhT7PEcAX9K3P4MpoM0lhGBMYR7q", "User"));
        for (int i = 0; i < 2; i++) {
            assert (searched_users.get(i).equals(expected_users.get(i)));
        }
        expected_users.clear();
    }

    @Test
    void test4() {
        // Testing last name filter search
        List<User> searched_users;
        List<User> expected_users = new ArrayList<User>();
        // Testing exact match for one
        searched_users = usi.searchByLastName("Smith");
        expected_users.add(new User(1, "BaseViewer", "Viewer", "Smith",
                "$2a$10$RvqfkX9AO8DNjqC0X76QruhNh4Ydo/Hd5jSGXrIDHtSTE9QuyLzOi", "Viewer"));
        assert (searched_users.get(0).equals(expected_users.get(0)));
        expected_users.clear();

        // Testing similar match for one
        searched_users = usi.searchByLastName("mit");
        expected_users.add(new User(1, "BaseViewer", "Viewer", "Smith",
                "$2a$10$RvqfkX9AO8DNjqC0X76QruhNh4Ydo/Hd5jSGXrIDHtSTE9QuyLzOi", "Viewer"));
        assert (searched_users.get(0).equals(expected_users.get(0)));
        expected_users.clear();

        // Testing similar match for all
        searched_users = usi.searchByLastName("S");
        expected_users.add(new User(1, "BaseViewer", "Viewer", "Smith",
                "$2a$10$RvqfkX9AO8DNjqC0X76QruhNh4Ydo/Hd5jSGXrIDHtSTE9QuyLzOi", "Viewer"));
        expected_users.add(new User(3, "BaseAdmin", "Admin", "Johnson",
                "$2a$10$0UFTgHWL7qpm2h45eQPer.UFmUQO7wbJFVbfU9PhSXrbWAaEqJbzm", "Admin"));
        for (int i = 0; i < 2; i++) {
            assert (searched_users.get(i).equals(expected_users.get(i)));
        }
        expected_users.clear();
    }

    @Test
    void test5() {
        // Testing role filter search
        List<User> searched_users;
        List<User> expected_users = new ArrayList<User>();
        // Testing exact match for one
        searched_users = usi.searchByRole("Viewer");
        expected_users.add(new User(1, "BaseViewer", "Viewer", "Smith",
                "$2a$10$RvqfkX9AO8DNjqC0X76QruhNh4Ydo/Hd5jSGXrIDHtSTE9QuyLzOi", "Viewer"));
        assert (searched_users.get(0).equals(expected_users.get(0)));
        expected_users.clear();

        // Testing similar match for one
        searched_users = usi.searchByRole("eWe");
        expected_users.add(new User(1, "BaseViewer", "Viewer", "Smith",
                "$2a$10$RvqfkX9AO8DNjqC0X76QruhNh4Ydo/Hd5jSGXrIDHtSTE9QuyLzOi", "Viewer"));
        assert (searched_users.get(0).equals(expected_users.get(0)));
        expected_users.clear();

        // Testing similar match for all
        searched_users = usi.searchByRole("er");
        expected_users.add(new User(1, "BaseViewer", "Viewer", "Smith",
                "$2a$10$RvqfkX9AO8DNjqC0X76QruhNh4Ydo/Hd5jSGXrIDHtSTE9QuyLzOi", "Viewer"));
        expected_users.add(new User(2, "BaseUser", "User", "Martinez",
                "$2a$10$DZ.h7Vu.D2CHp2XB/XpkkeD4ovhT7PEcAX9K3P4MpoM0lhGBMYR7q", "User"));
        for (int i = 0; i < 2; i++) {
            assert (searched_users.get(i).equals(expected_users.get(i)));
        }
        expected_users.clear();
    }

    @Test
    void test6() {
        // Testing creation and deletion of users
        // Testing creation
        User u = new User(4, "TempUser", "Temp", "User", "randomEncodedPassword123", "Viewer");
        usi.registerUser(u, "Tom");
        assert (usi.findUser("TempUser").equals(u));

        // Testing deletion
        usi.deleteUser(u.getId(), "Tom");
        assert (usi.findUser("TempUser") == null);
    }

    @Test
    void test7() {
        // Testing sorting alphabetically by username
        List<User> sorted_users = usi.sort(usi.refreshUser(), "UserName");
        List<User> expected_users = new ArrayList<User>();

        expected_users.add(new User(3, "BaseAdmin", "Admin", "Johnson",
                "$2a$10$0UFTgHWL7qpm2h45eQPer.UFmUQO7wbJFVbfU9PhSXrbWAaEqJbzm", "Admin"));
        expected_users.add(new User(2, "BaseUser", "User", "Martinez",
                "$2a$10$DZ.h7Vu.D2CHp2XB/XpkkeD4ovhT7PEcAX9K3P4MpoM0lhGBMYR7q", "User"));
        expected_users.add(new User(1, "BaseViewer", "Viewer", "Smith",
                "$2a$10$RvqfkX9AO8DNjqC0X76QruhNh4Ydo/Hd5jSGXrIDHtSTE9QuyLzOi", "Viewer"));

        for (int i = 0; i < 3; i++) {
            assert (sorted_users.get(i).equals(expected_users.get(i)));
        }
        expected_users.clear();
    }

    @Test
    void test8() {
        // Testing sorting alphabetically by first name
        List<User> sorted_users = usi.sort(usi.refreshUser(), "FirstName");
        List<User> expected_users = new ArrayList<User>();

        expected_users.add(new User(3, "BaseAdmin", "Admin", "Johnson",
                "$2a$10$0UFTgHWL7qpm2h45eQPer.UFmUQO7wbJFVbfU9PhSXrbWAaEqJbzm", "Admin"));
        expected_users.add(new User(2, "BaseUser", "User", "Martinez",
                "$2a$10$DZ.h7Vu.D2CHp2XB/XpkkeD4ovhT7PEcAX9K3P4MpoM0lhGBMYR7q", "User"));
        expected_users.add(new User(1, "BaseViewer", "Viewer", "Smith",
                "$2a$10$RvqfkX9AO8DNjqC0X76QruhNh4Ydo/Hd5jSGXrIDHtSTE9QuyLzOi", "Viewer"));

        for (int i = 0; i < 3; i++) {
            assert (sorted_users.get(i).equals(expected_users.get(i)));
        }
        expected_users.clear();
    }

    @Test
    void test9() {
        // Testing sorting alphabetically by last name
        List<User> sorted_users = usi.sort(usi.refreshUser(), "FirstName");
        List<User> expected_users = new ArrayList<User>();

        expected_users.add(new User(3, "BaseAdmin", "Admin", "Johnson",
                "$2a$10$0UFTgHWL7qpm2h45eQPer.UFmUQO7wbJFVbfU9PhSXrbWAaEqJbzm", "Admin"));
        expected_users.add(new User(2, "BaseUser", "User", "Martinez",
                "$2a$10$DZ.h7Vu.D2CHp2XB/XpkkeD4ovhT7PEcAX9K3P4MpoM0lhGBMYR7q", "User"));
        expected_users.add(new User(1, "BaseViewer", "Viewer", "Smith",
                "$2a$10$RvqfkX9AO8DNjqC0X76QruhNh4Ydo/Hd5jSGXrIDHtSTE9QuyLzOi", "Viewer"));

        for (int i = 0; i < 3; i++) {
            assert (sorted_users.get(i).equals(expected_users.get(i)));
        }
        expected_users.clear();
    }

    @Test
    void tes10() {
        // Testing reset password
        User u = new User(4, "TempUser", "Temp", "User", "randomEncodedPassword123", "Viewer");
        usi.registerUser(u, "Tom");
        String firstPassword = u.getUser_password();
        usi.resetPassword("TempUser", "password");
        u = usi.findUser("TempUser");
        assert (!u.getUser_password().equals(firstPassword));
        usi.deleteUser(u.getId(), "Tom");
    }

    @Test
    void test11() {
        // Testing editing of users
        User u = new User(4, "TempUser", "Temp", "User", "randomEncodedPassword123", "Viewer");
        usi.registerUser(u, "Tom");
        assert (usi.searchByUsername("TempUser").get(0).equals(u));
        User newU = u;
        newU.setUser_name("TempUser2");
        newU.setUser_first_name("Temp2");
        newU.setUser_last_name("User2");
        usi.editUser(newU, "Tom"); // checks edits by the same ID
        for (int i = 0; i < usi.searchByUsername("TempUser").size(); i++) {
            // if old tempUser exists, this would fail. If it doesnt and is replaced by new,
            // it passes.
            assert (usi.searchByUsername("TempUser").get(i).equals(newU));
        }
        assert (usi.searchByUsername("TempUser").get(0).equals(newU));
        usi.deleteUser(newU.getId(), "Tom");
    }

    // Testing incorrect cases (such as creating a user that already exists)
}
