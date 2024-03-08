package cs2815.project.controller;

import cs2815.project.model.User;
import cs2815.project.model.specialmodels.LoginResponse;
import cs2815.project.model.specialmodels.ResetPasswordRequest;
import cs2815.project.service.AssetService;
import cs2815.project.service.AssetTypeService;
import cs2815.project.service.LanguageService;
import cs2815.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    // used for creating base database for an empty database
    @Autowired
    private LanguageService languageService;
    @Autowired
    private AssetTypeService assetTypeService;
    @Autowired
    private AssetService assetService;


    @PostMapping("/createuser")
    public void registerUser(@RequestBody User user) {
        userService.registerUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody User user) {

    // if users table is empty, call all createBase for all tables
        if (userService.refreshUser().size() == 0) {
            userService.createBaseUsers();
            languageService.createBaseLanguages();
            assetTypeService.createBaseTypes();
            assetService.createBaseAssets();
        }

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

    @DeleteMapping("/{user_id}")
    public ResponseEntity<String> deleteUser(@PathVariable int user_id) {
        userService.deleteUser(user_id);
        return ResponseEntity.ok("User deleted successfully");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest passReset) {
        userService.resetPassword(passReset.getUserName(), passReset.getNewPassword());
        return ResponseEntity.ok("Password reset successfully");
    }

    @GetMapping("/refresh")
    public ResponseEntity<List<User>> refreshUser() {
        List<User> users = userService.refreshUser();
        return ResponseEntity.ok(users);
    }

    @PostMapping("/search/username")
    public ResponseEntity<List<User>> searchByUsername(@RequestBody Map<String,String> searchString) {
        List<User> compatibleUsers = userService.searchByUsername(searchString.get("searchTerm"));
        return ResponseEntity.ok(compatibleUsers);
    }

    @PostMapping("/search/firstname")
    public ResponseEntity<List<User>> searchByFirstName(@RequestBody Map<String,String> searchString) {
        List<User> compatibleUsers = userService.searchByFirstName(searchString.get("searchTerm"));
        return ResponseEntity.ok(compatibleUsers);
    }

    @PostMapping("/search/lastname")
    public ResponseEntity<List<User>> searchByLastName(@RequestBody Map<String,String> searchString) {
        List<User> compatibleUsers = userService.searchByLastName(searchString.get("searchTerm"));
        return ResponseEntity.ok(compatibleUsers);
    }

    @PostMapping("/search/role")
    public ResponseEntity<List<User>> searchByRole(@RequestBody Map<String,String> searchString) {
        List<User> compatibleUsers = userService.searchByRole(searchString.get("searchTerm"));
        return ResponseEntity.ok(compatibleUsers);
    }
}
