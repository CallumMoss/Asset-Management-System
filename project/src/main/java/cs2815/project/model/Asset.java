package cs2815.project.model;

import java.sql.Timestamp;
import java.util.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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

        @Column(unique = true)
        private String title;
        private String asset_description;
        private String link;

        private Timestamp updateTimestamp;

        @ManyToOne
        @JoinColumn(name = "asset_type_id")
        private AssetType Asset_type;

        @ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.ALL, CascadeType.REMOVE })
        @JoinTable(name = "asset_user", joinColumns = @JoinColumn(name = "asset_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
        private List<User> authors;

        @JsonIgnore
        @OneToMany(mappedBy = "asset", cascade = CascadeType.ALL)
        private List<AssetDependency> dependencies;

        @ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH,
                        CascadeType.REFRESH })
        @JoinTable(name = "asset_languages", joinColumns = @JoinColumn(name = "asset_id"), inverseJoinColumns = @JoinColumn(name = "language_id"))
        private List<Languages> languages;

}
