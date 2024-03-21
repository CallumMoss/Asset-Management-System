package cs2815.project.repo;

/*
 * Springboot imports:
 */
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

/*
 * Imports for project:
 */
import cs2815.project.model.User;

/*
 * Java imports:
 */
import java.util.List;

/**
 * Interface for User repository.
 */
@RepositoryRestResource
public interface UserRepo extends JpaRepository<User, Integer> {

        /**
         * Retrieves all users.
         *
         * @return A list of all users.
         */
        @Query("SELECT u FROM User u")
        List<User> getAllUsers();

        /**
         * Finds a user by their username.
         *
         * @param userName The username of the user.
         * @return The user with the specified username.
         */
        @Query("SELECT u FROM User u WHERE u.user_name = :userName")
        User findByUserName(@Param("userName") String userName);

        /**
         * Finds a user by their ID.
         *
         * @param id The ID of the user.
         * @return The user with the specified ID.
         */
        @Query("SELECT u FROM User u WHERE u.id = :id")
        User findById(@Param("id") int id);

        /**
         * Deletes a user by their ID.
         *
         * @param userId The ID of the user to be deleted.
         */
        @Modifying
        @Transactional
        @Query("DELETE FROM User u WHERE u.id = :userId")
        void deleteUserById(@Param("userId") int userId);

        /**
         * Removes a user's ID from the asset_user table.
         *
         * @param userId The ID of the user whose associations are to be removed.
         */
        @Modifying
        @Transactional
        @Query(nativeQuery = true, value = "DELETE FROM asset_user WHERE user_id = :userId")
        void eraseUserIdFromAssetUser(@Param("userId") int userId);

        /**
         * Updates fields of a user by their ID.
         *
         * @param userId       The ID of the user to be updated.
         * @param newUserName  The new username for the user.
         * @param newFirstName The new first name for the user.
         * @param newLastName  The new last name for the user.
         * @param newUserRole  The new role for the user.
         */
        @Modifying
        @Transactional
        @Query("UPDATE User u SET u.user_name = :newUserName, u.user_first_name = :newFirstName, " +
                "u.user_last_name = :newLastName, u.user_role = :newUserRole " +
                "WHERE u.id = :userId")
        void updateUserFieldsById(@Param("userId") int userId,
                                @Param("newUserName") String newUserName,
                                @Param("newFirstName") String newFirstName,
                                @Param("newLastName") String newLastName,
                                @Param("newUserRole") String newUserRole);

        /**
         * Resets a user's password.
         *
         * @param userName     The username of the user whose password is to be reset.
         * @param newPassword  The new password for the user.
         */
        @Modifying
        @Transactional
        @Query("UPDATE User u SET u.user_password = :newPassword " +
                "WHERE u.user_name = :userName")
        void resetPassword(@Param("userName") String userName,
                        @Param("newPassword") String newPassword);

        /**
         * Retrieves all usernames.
         *
         * @return A list of all usernames.
         */
        @Query("SELECT u.user_name FROM User u")
        List<String> findAllUserNames();

        /**
         * Retrieves all first names.
         *
         * @return A list of all first names.
         */
        @Query("SELECT u.user_first_name FROM User u")
        List<String> findAllFNames();

        /**
         * Retrieves all last names.
         *
         * @return A list of all last names.
         */
        @Query("SELECT u.user_last_name FROM User u")
        List<String> findAllLNames();

        /**
         * Retrieves all user roles.
         *
         * @return A list of all user roles.
         */
        @Query("SELECT u.user_role FROM User u")
        List<String> findAllRoles();

        /**
         * Retrieves users by their username.
         *
         * @param Username The username to search for.
         * @return A list of users with the specified username.
         */
        @Query("SELECT u FROM User u WHERE u.user_name = :Username")
        List<User> getUserByUsername(@Param("Username") String Username);

        /**
         * Retrieves users by their first name.
         *
         * @param FirstName The first name to search for.
         * @return A list of users with the specified first name.
         */
        @Query("SELECT u FROM User u WHERE u.user_first_name = :FirstName")
        List<User> getUserByName(@Param("FirstName") String FirstName);

        /**
         * Retrieves users by their last name.
         *
         * @param LastName The last name to search for.
         * @return A list of users with the specified last name.
         */
        @Query("SELECT u FROM User u WHERE u.user_last_name = :LastName")
        List<User> getUserByLastname(@Param("LastName") String LastName);

        /**
         * Retrieves users by their role.
         *
         * @param Role The role to search for.
         * @return A list of users with the specified role.
         */
        @Query("SELECT u FROM User u WHERE u.user_role = :Role")
        List<User> getUserByRole(@Param("Role") String Role);
}