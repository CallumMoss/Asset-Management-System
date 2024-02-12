package cs2815.project.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

import cs2815.project.model.User;

import java.util.List;

@RepositoryRestResource
public interface UserRepo extends JpaRepository<User, Integer> {

        @Query("SELECT u FROM User u")
        List<User> getAllUsers();

        @Query("SELECT u FROM User u WHERE u.user_name = :userName")
        User findByUserName(@Param("userName") String userName);

        @Query("SELECT u FROM User u WHERE u.id = :id")
        User findById(@Param("id") int id);

        @Modifying
        @Transactional
        @Query("DELETE FROM User u WHERE u.id = :userId")
        void deleteUserById(@Param("userId") int userId);

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

        @Modifying
        @Transactional
        @Query("UPDATE User u SET u.user_password = :newPassword " +
                        "WHERE u.id = :userId")
        void resetPassword(@Param("userId") int userId,
                        @Param("newPassword") String newPassword);

        @Query("SELECT u.user_name FROM User u")
        List<String> findAllUserNames();

        @Query("SELECT u.user_first_name FROM User u")
        List<String> findAllFNames();

        @Query("SELECT u.user_last_name FROM User u")
        List<String> findAllLNames();
}
