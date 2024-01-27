package cs2815.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cs2815.project.model.User;
import cs2815.project.repo.UserRepo;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepo repo;

    @PostMapping("/registerUser")
    public void registerUser(@RequestBody User user) {
        repo.save(user);
    }

}
