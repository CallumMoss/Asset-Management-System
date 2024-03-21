package cs2815.project.model;

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

import java.util.Objects;

import org.springframework.security.crypto.password.PasswordEncoder;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true)
    private String user_name;

    private String user_first_name;
    private String user_last_name;
    private String user_password;
    private String user_role;
    

    public User(String uName, String uFName, String uLName, String uPassword, String uRole, PasswordEncoder key) {
        this.user_name = uName;
        this.user_first_name = uFName;
        this.user_last_name = uLName;
        this.user_password = key.encode(uPassword);
        this.user_role = uRole;
    }

    public void encryptPassword(PasswordEncoder key) {
        this.user_password = key.encode(user_password);
    }

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

    @Override
    public int hashCode() {
        return Objects.hash(id, user_first_name, user_last_name, user_name, user_role);
    }
}
