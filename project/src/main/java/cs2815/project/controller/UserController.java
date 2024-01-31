package cs2815.project.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cs2815.project.model.LoginResponse;
import cs2815.project.model.User;
import cs2815.project.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public void registerUser(@RequestBody User user) {
        userService.registerUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody User user) {
        boolean loginSuccessful = userService.logIn(user);
        String userRole = userService.getUserRole(user.getUser_name());
        return ResponseEntity.ok(new LoginResponse(loginSuccessful, userRole));

    }
}
