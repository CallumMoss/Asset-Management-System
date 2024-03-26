package cs2815.project.service.Implementations;

/*
 * Imports for project:
 */
import cs2815.project.model.Log;
import cs2815.project.model.User;
import cs2815.project.repo.ChatBoardRepo;
import cs2815.project.repo.LogRepo;
import cs2815.project.repo.UserRepo;
import cs2815.project.service.UserService;

/*
 * Springboot imports:
 */
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/*Java imports: */
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Implementation of the UserService interface that provides functionality related to user management.
 */
@Service
public class UserServiceImpl implements UserService {

    //Private fields:
    @Autowired
    private UserRepo repo;

    @Autowired
    private ChatBoardRepo chatrepo;

    @Autowired
    private LogRepo logrepo;

    @Autowired
    private PasswordEncoder key;

    /**
     * Creates base users if they do not already exist in the database.
     */
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

    /**
     * Registers a new user in the system.
     * @param user The user to register.
     * @param username The username of the user performing the registration.
     */
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

    /**
     * Logs in a user.
     * @param user The user to log in.
     * @return True if the login is successful, false otherwise.
     */
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

    /**
     * Retrieves the role of user by username.
     * @param username The username of the user.
     * @return The role of the user, or null if the user does not exist.
     */
    @Override
    public String getUserRole(String username) {
        User user = repo.findByUserName(username);
        return user != null ? user.getUser_role() : null;
    }

    /**
     * Edits a user's information.
     * @param user The user with updated information.
     * @param username The username of the user performing the edit.
     */
    @Override
    public void editUser(User user, String username) {
        Log log = new Log();
        log.setUser(repo.findByUserName(username));
        log.setUpdateDescription(user.getUser_name() + " was successfully edited!");
        log.setUpdateTimestamp(new Timestamp(System.currentTimeMillis()));
        logrepo.save(log);
        repo.updateUserFieldsById(user.getId(), user.getUser_name(), user.getUser_first_name(),
                user.getUser_last_name(), user.getUser_role());
    }

    /**
     * Deletes a user from system.
     * @param userId The ID of the user to delete.
     * @param username The username of the user performing the deletion.
     */
    @Override
    public void deleteUser(int userId, String username) {
        Log log = new Log();
        User tempUser = repo.findById(userId);
        log.setUpdateDescription(tempUser.getUser_name() + " was successfully deleted!");
        log.setUpdateTimestamp(new Timestamp(System.currentTimeMillis()));
        log.setUser(repo.findByUserName(username));
        logrepo.save(log);
        repo.eraseUserIdFromAssetUser(userId);
        logrepo.eraseUserIdFromLogs(userId);
        chatrepo.eraseUserIdfromChatBoard(userId);
        repo.deleteById(userId);
    }

    /**
     * Resets the password of a user.
     * @param userName The username of the user.
     * @param newPassword The new password.
     */
    @Override
    public void resetPassword(String userName, String newPassword) {
        Log log = new Log();
        User tempUser = repo.findByUserName(userName);
        log.setUser(tempUser);
        log.setUpdateDescription(tempUser.getUser_name() + " password successfully changed!");
        log.setUpdateTimestamp(new Timestamp(System.currentTimeMillis()));
        logrepo.save(log);
        repo.resetPassword(userName, key.encode(newPassword));
    }

    /**
     * Sorts a list of users based on the specified criteria.
     * @param unsortedUsers The unsorted list of users.
     * @param orderBy The criteria to sort by.
     * @return The sorted list of users.
     */
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

    /**
     * Retrieves all users from the database.
     * @return A list of all users.
     */
    @Override
    public List<User> refreshUser() {
        return repo.getAllUsers();
    }

    /**
     * Searches for users by username.
     * @param searchString The search string to match usernames.
     * @return A list of users matching the search criteria.
     */
    @Override
    public List<User> searchByUsername(String searchString) {
        List<String> usernameList = repo.findAllUserNames();
        List<User> compatibleUsers = new ArrayList<>();
        List<User> users;
        for (String username : usernameList) {
            if (isSimilar(searchString, username)) {
                users = repo.getUserByUsername(username);
                compatibleUsers.addAll(users);
                if (!compatibleUsers.contains(users.get(0))) {
                    compatibleUsers.addAll(users);
                }
            }
        }
        return compatibleUsers;
    }

    /**
     * Searches for users by first name.
     * @param searchString The search string to match first names.
     * @return A list of users matching the search criteria.
     */
    @Override
    public List<User> searchByFirstName(String searchString) {
        List<String> FNameList = repo.findAllFNames();
        List<User> compatibleUsers = new ArrayList<>();
        List<User> users;
        for (String firstname : FNameList) {
            if (isSimilar(searchString, firstname)) {
                users = repo.getUserByName(firstname);
                if (!compatibleUsers.contains(users.get(0))) {
                    compatibleUsers.addAll(users);
                }
            }
        }
        return compatibleUsers;
    }

    /**
     * Searches for users by last name.
     * @param searchString The search string to match last names.
     * @return A list of users matching the search criteria.
     */
    @Override
    public List<User> searchByLastName(String searchString) {
        List<String> LNameList = repo.findAllLNames();
        List<User> compatibleUsers = new ArrayList<>();
        List<User> users;
        for (String lastname : LNameList) {
            if (isSimilar(searchString, lastname)) {
                users = repo.getUserByLastname(lastname);
                if (!compatibleUsers.contains(users.get(0))) {
                    compatibleUsers.addAll(users);
                }
            }
        }
        return compatibleUsers;
    }

    /**
     * Searches for users by their role.
     * @param searchString The search string to match roles.
     * @return A list of users matching the search criteria.
     */
    @Override
    public List<User> searchByRole(String searchString) {
        List<String> roleList = repo.findAllRoles();
        List<User> compatibleUsers = new ArrayList<>();
        List<User> users;
        for (String role : roleList) {
            if (isSimilar(searchString, role)) {
                users = repo.getUserByRole(role);
                if (!compatibleUsers.contains(users.get(0))) {
                    compatibleUsers.addAll(users);
                }
            }
        }
        return compatibleUsers;
    }

    /**
     * Checks if two strings are similar.
     * @param searchString The first string.
     * @param compareString The second string.
     * @return True if the strings are similar, false otherwise.
     */
    public boolean isSimilar(String searchString, String compareString) {
        if (searchString.equals(compareString)) {
            return true;
        }
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

    /**
     * Finds a user by their username.
     * @param userName The username of the user to find.
     * @return The user with the specified username.
     */
    @Override
    public User findUser(String userName) {
        return repo.findByUserName(userName);
    }
}