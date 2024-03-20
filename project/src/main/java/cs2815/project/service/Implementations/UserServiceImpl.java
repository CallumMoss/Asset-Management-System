package cs2815.project.service.Implementations;

import cs2815.project.model.Asset;
import cs2815.project.model.Log;
import cs2815.project.model.User;
import cs2815.project.repo.ChatBoardRepo;
import cs2815.project.repo.LogRepo;
import cs2815.project.repo.UserRepo;
import cs2815.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo repo;

    @Autowired
    private ChatBoardRepo chatrepo;

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
    public void registerUser(User user, String username) {

        user.encryptPassword(key);

        Log log = new Log();

        repo.save(user);
        log.setUser(repo.findByUserName(username));
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
            loginLog.setUpdateDescription(user.getUser_name() + " successfully logged in!");

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
    public void editUser(User user, String username) {

        Log log = new Log();
        log.setUser(repo.findByUserName(username));
        log.setUpdateDescription(user.getUser_name() + " was succesfully edited!");
        log.setUpdateTimestamp(new Timestamp(System.currentTimeMillis()));
        logrepo.save(log);

        repo.updateUserFieldsById(user.getId(), user.getUser_name(), user.getUser_first_name(),
                user.getUser_last_name(), user.getUser_role());
    }

    @Override
    public void deleteUser(int userId, String username) {

        Log log = new Log();
        User tempUser = repo.findById(userId);
        log.setUpdateDescription(tempUser.getUser_name() + " was succefully deleted!");
        log.setUpdateTimestamp(new Timestamp(System.currentTimeMillis()));
        log.setUser(repo.findByUserName(username));
        logrepo.save(log);

        repo.eraseUserIdFromAssetUser(userId);
        logrepo.eraseUserIdFromLogs(userId);
        chatrepo.eraseUserIdfromChatBoard(userId);

        repo.deleteById(userId);
    }

    @Override
    public void resetPassword(String userName, String newPassword) {

        Log log = new Log();
        User tempUser = repo.findByUserName(userName);
        log.setUser(tempUser);
        log.setUpdateDescription(tempUser.getUser_name() + " password succesfully changed!");
        log.setUpdateTimestamp(new Timestamp(System.currentTimeMillis()));
        logrepo.save(log);

        repo.resetPassword(userName, key.encode(newPassword));
    }

    @Override
    public List<User> sort(List<User> unsortedUsers, String orderBy) {
        List<String> sortByList = new ArrayList<String>();
        List<User> sortedUsers = new ArrayList<>();
        List<User> allUsers = searchByUsername("");

        List<Integer> unsortedUserIds = new ArrayList<Integer>();
        for (User user : unsortedUsers) {
            unsortedUserIds.add(user.getId());
        }
        switch (orderBy) {
            case "FirstName":
                for (User user : unsortedUsers) {
                    sortByList.add(user.getUser_first_name().toLowerCase());
                }
                break;
            case "LastName":
                for (User user : unsortedUsers) {
                    sortByList.add(user.getUser_last_name().toLowerCase());
                }
                break;
            case "Oldest":
                for (User user : allUsers) {
                    if (unsortedUserIds.contains(user.getId())) {
                        sortedUsers.add(user);
                    }
                }
                return sortedUsers;
            case "Newest":
                for (User user : allUsers) {
                    if (unsortedUserIds.contains(user.getId())) {
                        sortedUsers.add(user);
                    }
                }
                Collections.reverse((sortedUsers));
                return sortedUsers;
            default:
                for (User user : unsortedUsers) {
                    // May need to add.LowerCase() to this in future, case sensitivity makes
                    // different usernames so not added for now.
                    sortByList.add(user.getUser_name());
                }
        }
        sortedUsers = unsortedUsers;
        String temp;
        User tempBis;
        int size = sortByList.size();
        for (int i = 0; i < size; i++) {
            for (int j = i + 1; j < size; j++) {
                if (sortByList.get(i).compareTo(sortByList.get(j)) > 0) {
                    temp = sortByList.get(i);
                    tempBis = sortedUsers.get(i);
                    sortByList.set(i, sortByList.get(j));
                    sortedUsers.set(i, sortedUsers.get(j));
                    sortByList.set(j, temp);
                    sortedUsers.set(j, tempBis);
                }
            }
        }
        return sortedUsers;
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
            if (searchString.equals(username) || isSimilar(searchString, username)) {
                List<User> users = repo.getUserByUsername(username);
                compatibleUsers.addAll(users);
                if (!compatibleUsers.contains(users.get(0))) {
                    compatibleUsers.addAll(users);
                }
            }
        }
        return compatibleUsers;
    }

    @Override
    public List<User> searchByFirstName(String searchString) {
        List<String> FNameList = repo.findAllFNames();
        List<User> compatibleUsers = new ArrayList<>();
        for (String firstname : FNameList) {
            if (searchString.equals(firstname) || isSimilar(searchString, firstname)) {
                List<User> users = repo.getUserByName(firstname);
                if (!compatibleUsers.contains(users.get(0))) {
                    compatibleUsers.addAll(users);
                }
            }
        }
        return compatibleUsers;
    }

    @Override
    public List<User> searchByLastName(String searchString) {
        List<String> LNameList = repo.findAllLNames();
        List<User> compatibleUsers = new ArrayList<>();
        for (String lastname : LNameList) {
            if (searchString.equals(lastname) || isSimilar(searchString, lastname)) {
                List<User> users = repo.getUserByLastname(lastname);
                if (!compatibleUsers.contains(users.get(0))) {
                    compatibleUsers.addAll(users);
                }
            }
        }
        return compatibleUsers;
    }

    @Override
    public List<User> searchByRole(String searchString) {
        List<String> roleList = repo.findAllRoles();
        List<User> compatibleUsers = new ArrayList<>();
        for (String role : roleList) {
            if (searchString.equals(role) || isSimilar(searchString, role)) {
                List<User> users = repo.getUserByRole(role);
                if (!compatibleUsers.contains(users.get(0))) {
                    compatibleUsers.addAll(users);
                }
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

    @Override
    public User findUser(String userName) {

        return repo.findByUserName(userName);
    }
}
