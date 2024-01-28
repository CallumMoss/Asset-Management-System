package cs2815.project.repo;

import cs2815.project.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface UserRepo extends JpaRepository<User, String> {

    @Query("SELECT u FROM User u WHERE u.user_name = :userName")
    User findByUserName(@Param("userName") String userName);

}
