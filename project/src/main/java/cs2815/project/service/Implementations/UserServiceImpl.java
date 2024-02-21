package cs2815.project.service.Implementations;

import java.util.List;
import java.sql.Timestamp;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import cs2815.project.model.Log;
import cs2815.project.model.User;
import cs2815.project.repo.LogRepo;
import cs2815.project.repo.UserRepo;
import cs2815.project.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo repo;

    @Autowired
    private LogRepo logrepo;

    @Autowired
    private PasswordEncoder key;

    @Override
    public void createBaseUsers() {

        if (repo.findByUserName("BaseAdmin") == null && repo.findByUserName("BaseViewer") == null
                && repo.findByUserName("BaseUser") == null) {
            User baseViewer = new User("BaseViewer", "Viewer", "Smith", "password",
                    "Viewer", key);
            User baseUser = new User("BaseUser", "User", "Martinez", "password", "User",
                    key);
            User baseAdmin = new User("BaseAdmin", "Admin", "Johnson", "password",
                    "Admin", key);
            repo.save(baseViewer);
            repo.save(baseUser);
            repo.save(baseAdmin);
        }

    }

    @Override
    public void registerUser(User user) {

        user.encryptPassword(key);

        Log log = new Log();

        repo.save(user);
        log.setUser(user);
        log.setUpdateTimestamp(new Timestamp(System.currentTimeMillis()));
        log.setUpdateDescription(user.getUser_name() + " was created!");

        logrepo.save(log);

    }

    @Override
    public boolean logIn(User user) {
        User existingUser = repo.findByUserName(user.getUser_name());

        Log loginLog = new Log();
        loginLog.setUser(existingUser);

        loginLog.setUpdateTimestamp(new Timestamp(System.currentTimeMillis()));

        boolean authenticated = existingUser != null
                && key.matches(user.getUser_password(), existingUser.getUser_password());
        if (authenticated) {
            loginLog.setUpdateDescription(user.getUser_name() + " succesfully logged in!");

        } else {
            loginLog.setUpdateDescription(user.getUser_name() + " failed to log in!");
        }

        logrepo.save(loginLog);

        return authenticated;
    }

    @Override
    public String getUserRole(String username) {
        User user = repo.findByUserName(username);
        return user != null ? user.getUser_role() : null;
    }

    @Override
    public void editUser(User user) {

        Log log = new Log();
        log.setUser(user);
        log.setUpdateDescription(user.getUser_name() + " was succesfully edited!");
        log.setUpdateTimestamp(new Timestamp(System.currentTimeMillis()));
        logrepo.save(log);

        repo.updateUserFieldsById(user.getId(), user.getUser_name(), user.getUser_first_name(),
                user.getUser_last_name(), user.getUser_role());
    }

    @Override
    public void deleteUser(int userId) {

        Log log = new Log();
        User tempUser = repo.findById(userId);
        log.setUpdateDescription(tempUser.getUser_name() + " was succefully deleted!");
        log.setUpdateTimestamp(new Timestamp(System.currentTimeMillis()));
        logrepo.save(log);

        repo.eraseUserIdFromAssetUser(userId);
        logrepo.eraseUserIdFromLogs(userId);

        repo.deleteById(userId);
    }

    @Override
    public void resetPassword(int userId, String newPassword) {

        Log log = new Log();
        User tempUser = repo.findById(userId);
        log.setUser(tempUser);
        log.setUpdateDescription(tempUser.getUser_name() + " password succesfully reseted!");
        log.setUpdateTimestamp(new Timestamp(System.currentTimeMillis()));
        logrepo.save(log);

        repo.resetPassword(userId, key.encode(newPassword));
    }

    @Override
    public List<User> refreshUser() {
        return repo.getAllUsers();
    }

    @Override
    public List<User> searchByUsername(String searchString) {
        List<String> usernameList = repo.findAllUserNames();
        List<User> compatibleUsers = new ArrayList<>();
        for (String username : usernameList) {
            if (isSimilar(searchString, username)) {
                compatibleUsers.add(repo.getUserByUsername(username));
            }
        }
        return compatibleUsers;
    }

    @Override
    public List<User> searchByFirstName(String searchString) {
        List<String> FNameList = repo.findAllFNames();
        List<User> compatibleUsers = new ArrayList<>();
        for (String firstname : FNameList) {
            if (isSimilar(searchString, firstname)) {
                compatibleUsers.add(repo.getUserByName(firstname));
            }
        }
        return compatibleUsers;
    }

    @Override
    public List<User> searchByLastName(String searchString) {
        List<String> LNameList = repo.findAllLNames();
        List<User> compatibleUsers = new ArrayList<>();
        for (String lastname : LNameList) {
            if (isSimilar(searchString, lastname)) {
                compatibleUsers.add(repo.getUserByLastname(lastname));
            }
        }
        return compatibleUsers;
    }

    public boolean isSimilar(String searchString, String compareString) {
        int pointerSearch = 0;
        int pointerCompare = 0;
        while (pointerSearch < searchString.length() && pointerCompare < compareString.length()) {
            if (searchString.toLowerCase().charAt(pointerSearch) == compareString.toLowerCase()
                    .charAt(pointerCompare)) {
                pointerSearch++;
            }
            pointerCompare++;
        }
        return pointerSearch == searchString.length();
    }

}
