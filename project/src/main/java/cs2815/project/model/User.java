package cs2815.project.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

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

    @ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH,
            CascadeType.REFRESH })
    @JoinTable(name = "user_asset", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "asset_id"))
    private List<Asset> authoredAssets;

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
}
