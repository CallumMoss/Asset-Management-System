package cs2815.project.model;

/*Imports: */
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/*
 * Java imports:
 */
import java.util.Objects;

/*
 * Springboot imports:
 */
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Model for Users:
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {
    //Private fields:
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true)
    private String user_name;

    private String user_first_name;
    private String user_last_name;
    private String user_password;
    private String user_role;
    

    /**
     * Constructor for Users:
     * @param uName
     * @param uFName
     * @param uLName
     * @param uPassword
     * @param uRole
     * @param key
     */
    public User(String uName, String uFName, String uLName, String uPassword, String uRole, PasswordEncoder key) {
        this.user_name = uName;
        this.user_first_name = uFName;
        this.user_last_name = uLName;
        this.user_password = key.encode(uPassword);
        this.user_role = uRole;
    }

    /*
     * encrypt password setter
     */
    public void encryptPassword(PasswordEncoder key) {
        this.user_password = key.encode(user_password);
    }

    /*
     * Function to compare objects.
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return id == user.id &&
                Objects.equals(user_first_name, user.user_first_name) &&
                Objects.equals(user_last_name, user.user_last_name) &&
                Objects.equals(user_name, user.user_name) &&
                Objects.equals(user_role, user.user_role);
    }

    /*
     * Hash function to store users.
     */
    @Override
    public int hashCode() {
        return Objects.hash(id, user_first_name, user_last_name, user_name, user_role);
    }
}