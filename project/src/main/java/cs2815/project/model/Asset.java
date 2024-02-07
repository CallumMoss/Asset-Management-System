package cs2815.project.model;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "assets")
public class Asset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int asset_id;

    private String title;
    private String asset_description;
    private String link;

    @ManyToMany
    @JoinTable(name = "asset_language", joinColumns = @JoinColumn(name = "asset_id"), inverseJoinColumns = @JoinColumn(name = "language_id"))
    private List<Language> languages;

    @ManyToOne
    @JoinColumn(name = "asset_type_id")
    private AssetType asset_type;

    private Timestamp updateTimestamp;

    @ManyToMany
    @JoinTable(name = "asset_user", joinColumns = @JoinColumn(name = "asset_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<User> authors;

    @ManyToMany
    @JoinTable(name = "asset_dependency", joinColumns = @JoinColumn(name = "asset_id"), inverseJoinColumns = @JoinColumn(name = "dependency_id"))
    private List<Dependency> dependencies;
}
