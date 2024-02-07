package cs2815.project.service.Implementations;

import java.util.List;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import cs2815.project.model.User;
import cs2815.project.repo.UserRepo;
import cs2815.project.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo repo;

    @Autowired
    private PasswordEncoder key;

    @Override
    public void createBaseUsers() {
        if (repo.findByUserName("BaseAdmin") == null) {
            User baseViewer = new User("BaseViewer", "Viewer", "Smith", "password", "Viewer", key);
            User baseUser = new User("BaseUser", "User", "Martinez", "password", "User", key);
            User baseAdmin = new User("BaseAdmin", "Admin", "Johnson", "password", "Admin", key);
            repo.save(baseViewer);
            repo.save(baseUser);
            repo.save(baseAdmin);
        }
    }

    @Override
    public void registerUser(User user) {

        user.encryptPassword(key);
        repo.save(user);
    }

    @Override
    public boolean logIn(User user) {
        User existingUser = repo.findByUserName(user.getUser_name());
        return existingUser != null && key.matches(user.getUser_password(), existingUser.getUser_password());
    }

    @Override
    public String getUserRole(String username) {
        User user = repo.findByUserName(username);
        return user != null ? user.getUser_role() : null;
    }

    @Override
    public void editUser(User user) {

        repo.updateUserFieldsById(user.getId(), user.getUser_name(), user.getUser_first_name(),
                user.getUser_last_name(), user.getUser_role());
    }

    @Override
    public void deleteUser(int userId) {
        repo.deleteById(userId);
    }

    @Override
    public void resetPassword(int userId, String newPassword) {

        repo.resetPassword(userId, key.encode(newPassword));
    }

    @Override
    public List<User> refreshUser() {
        return repo.getAllUsers();
    }

    @Override
    public List<String> searchByUsername(String searchString) {
        List<String> usernameList = repo.findAllUserNames();
        List<String> compatibleList = new ArrayList<>();
        for (String username : usernameList) {
            if (isSimilar(searchString, username)) {
                compatibleList.add(username);
            }
        }
        return compatibleList;
    }

    @Override
    public List<String> searchByFirstName(String searchString) {
        List<String> FNameList = repo.findAllFNames();
        List<String> compatibleList = new ArrayList<>();
        for (String firstname : FNameList) {
            if (isSimilar(searchString, firstname)) {
                compatibleList.add(firstname);
            }
        }
        return compatibleList;
    }

    @Override
    public List<String> searchByLastName(String searchString) {
        List<String> LNameList = repo.findAllLNames();
        List<String> compatibleList = new ArrayList<>();
        for (String lastname : LNameList) {
            if (isSimilar(searchString, lastname)) {
                compatibleList.add(lastname);
            }
        }
        return compatibleList;
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
