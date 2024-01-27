package cs2815.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cs2815.project.model.User;
import cs2815.project.repo.UserRepo;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepo repo;

    @Override
    public void registerUser(User user) {
        repo.save(user);
    }

    @Override
    public boolean logIn(User user) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'logIn'");
    }

}
