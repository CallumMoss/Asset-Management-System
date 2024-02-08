package cs2815.project.controller;

import cs2815.project.model.User;
import cs2815.project.model.specialmodels.LoginResponse;
import cs2815.project.model.specialmodels.ResetPasswordRequest;
import cs2815.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/createuser")
    public void registerUser(@RequestBody User user) {
        userService.registerUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody User user) {
        userService.createBaseUsers();
        boolean loginSuccessful = userService.logIn(user);
        String userRole = userService.getUserRole(user.getUser_name());
        return ResponseEntity.ok(new LoginResponse(loginSuccessful, userRole));
    }

    @PostMapping("/role")
    public ResponseEntity<String> getUserRole(@RequestBody String username) {
        String role = userService.getUserRole(username);
        if (role != null) {
            return ResponseEntity.ok(role);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    @PostMapping("/edit")
    public ResponseEntity<String> editUser(@RequestBody User user) {
        userService.editUser(user);
        return ResponseEntity.ok("User edited successfully");
    }

    @PostMapping("/delete")
    public ResponseEntity<String> deleteUser(@RequestBody int userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok("User deleted successfully");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest passReset) {
        userService.resetPassword(passReset.getUserId(), passReset.getNewPassword());
        return ResponseEntity.ok("Password reset successfully");
    }

    @PostMapping("/refresh")
    public ResponseEntity<List<User>> refreshUser() {
        List<User> users = userService.refreshUser();
        return ResponseEntity.ok(users);
    }

    @PostMapping("/search/username")
    public ResponseEntity<List<String>> searchByUsername(@RequestBody String searchString) {
        List<String> compatibleUsernames = userService.searchByUsername(searchString);
        return ResponseEntity.ok(compatibleUsernames);
    }

    @PostMapping("/search/firstname")
    public ResponseEntity<List<String>> searchByFirstName(@RequestBody String searchString) {
        List<String> compatibleUsernames = userService.searchByFirstName(searchString);
        return ResponseEntity.ok(compatibleUsernames);
    }

    @PostMapping("/search/lastname")
    public ResponseEntity<List<String>> searchByLastName(@RequestBody String searchString) {
        List<String> compatibleUsernames = userService.searchByLastName(searchString);
        return ResponseEntity.ok(compatibleUsernames);
    }
}
