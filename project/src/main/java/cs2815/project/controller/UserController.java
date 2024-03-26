package cs2815.project.controller;

/*
 * Imports for project:
 */
import cs2815.project.model.User;
import cs2815.project.model.specialmodels.LoginResponse;
import cs2815.project.model.specialmodels.ResetPasswordRequest;
import cs2815.project.service.AssetService;
import cs2815.project.service.AssetTypeService;
import cs2815.project.service.UserService;

/*
 * Springboot imports: 
 */
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/*
 * Java imports:
 */
import java.util.List;
import java.util.Map;

/**
 * Class for actions involving users.
 */
@RestController
@RequestMapping("/users")
public class UserController {

    //Private fields:
    @Autowired
    private UserService userService;
    @Autowired
    private AssetTypeService assetTypeService;
    @Autowired
    private AssetService assetService;

    /*
     * Function to create new user and send to database.
     */
    @PostMapping("/createuser/{username}")
    public void registerUser(@RequestBody User user, @PathVariable String username) {
        userService.registerUser(user, username);
    }

    /*
     * Function to respond to user login.
     */
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody User user) {

        // if users table is empty, call all createBase for all tables
        if (userService.refreshUser().size() == 0) {
            System.out.println("Initializing db");
            userService.createBaseUsers();
            assetTypeService.createBaseTypes();
            assetService.createBaseAssets();
        }

        boolean loginSuccessful = userService.logIn(user);
        String userRole = userService.getUserRole(user.getUser_name());
        return ResponseEntity.ok(new LoginResponse(loginSuccessful, userRole));
    }

    /*
     * Function to get role of specified user.
     */
    @PostMapping("/role")
    public ResponseEntity<String> getUserRole(@RequestBody String username) {
        String role = userService.getUserRole(username);
        if (role != null) {
            return ResponseEntity.ok(role);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    /*
     * Function to respond to user's username being edited.
     */
    @PostMapping("/edit/{username}")
    public ResponseEntity<String> editUser(@RequestBody User user, @PathVariable String username) {
        userService.editUser(user, username);
        return ResponseEntity.ok("User edited successfully");
    }

    /*
     * Function to respond to deletion of specified user.
     */
    @DeleteMapping("/{user_id}/{username}")
    public ResponseEntity<String> deleteUser(@PathVariable int user_id, @PathVariable String username) {
        userService.deleteUser(user_id, username);
        return ResponseEntity.ok("User deleted successfully");
    }

    /*
     * Function to respond to password reset.
     */
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest passReset) {
        userService.resetPassword(passReset.getUserName(), passReset.getNewPassword());
        return ResponseEntity.ok("Password reset successfully");
    }

    /*
     * Function to respond to user of refresh button.
     */
    @GetMapping("/refresh")
    public ResponseEntity<List<User>> refreshUser() {
        List<User> users = userService.refreshUser();
        return ResponseEntity.ok(users);
    }

    /*
     * Function to respond to finding specified user.
     */
    @GetMapping("/finduser/{username}")
    public ResponseEntity<User> findUser(@PathVariable String username) {
        User user = userService.findUser(username);
        return ResponseEntity.ok(user);
    }

    /*
     * Function to respond to search by specified username.
     */
    @PostMapping("/search/username")
    public ResponseEntity<List<User>> searchByUsername(@RequestBody Map<String, String> searchString) {
        List<User> compatibleUsers = userService.searchByUsername(searchString.get("searchTerm"));
        return ResponseEntity.ok(compatibleUsers);
    }

    /*
     * Function to respond to search by specified firstname.
     */
    @PostMapping("/search/firstname")
    public ResponseEntity<List<User>> searchByFirstName(@RequestBody Map<String, String> searchString) {
        List<User> compatibleUsers = userService.searchByFirstName(searchString.get("searchTerm"));
        return ResponseEntity.ok(compatibleUsers);
    }

    /*
     * Function to respond to search by specified lastname.
     */
    @PostMapping("/search/lastname")
    public ResponseEntity<List<User>> searchByLastName(@RequestBody Map<String, String> searchString) {
        List<User> compatibleUsers = userService.searchByLastName(searchString.get("searchTerm"));
        return ResponseEntity.ok(compatibleUsers);
    }

    /*
     * Function to respond to search by specified role.
     */
    @PostMapping("/search/role")
    public ResponseEntity<List<User>> searchByRole(@RequestBody Map<String, String> searchString) {
        List<User> compatibleUsers = userService.searchByRole(searchString.get("searchTerm"));
        return ResponseEntity.ok(compatibleUsers);
    }

    @PostMapping("/sort") // If no orderBy string returned, will sort by username. Accepts "FirstName",
                          // "LastName", "Oldest" and "Newest"
    public ResponseEntity<List<User>> sort(@RequestBody List<User> unsortedUsers, @RequestParam String orderBy) {
        List<User> sortedUsers = userService.sort(unsortedUsers, orderBy);
        return ResponseEntity.ok(sortedUsers);
    }
}