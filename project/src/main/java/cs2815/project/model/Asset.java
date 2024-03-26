package cs2815.project.model;

/*
 * Java imports:
 */
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/*
 * Imports:
 */
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

/**
 * This class defines the entity asset in the database.
 * 
 * @author Tom
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "assets")
public class Asset {

        /**
         * Generated Id
         */
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private int asset_id;

        /**
         * Title column, which must be unique
         */
        @Column(unique = true)
        private String title;

        /**
         * Description column, where we store the Asset Description
         */
        private String asset_description;

        /**
         * Link column, where we can store the link to a storage.
         */
        private String link;

        /**
         * Storing the custom attributes
         */
        private String typeAttributeValue1;
        private String typeAttributeValue2;
        private String typeAttributeValue3;

        /**
         * Storing the date
         */
        private Timestamp updateTimestamp;

        /**
         * Defining a many-to-one relation with AssetType table and storing asset type
         * data
         */
        @ManyToOne
        @JoinColumn(name = "asset_type_id", nullable = false)
        private AssetType Asset_type;

        /**
         * Defining a many-to-many relation with the users table, and automatically
         * creating a middle table named "asset_user".
         */
        @ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.ALL, CascadeType.REMOVE })
        @JoinTable(name = "asset_user", joinColumns = @JoinColumn(name = "asset_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
        private List<User> authors;

        /**
         * Defining a one-to-many relation with the dependency table, and storing all
         * the dependencies in the dependency table.
         */
        @OneToMany(mappedBy = "asset", cascade = CascadeType.ALL)
        private List<AssetDependency> dependencies = new ArrayList<>();

     /**
     * Override equals method to compare Asset objects based on asset_id.
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Asset asset = (Asset) o;
        return asset_id == asset.asset_id;
    }

    /**
     * Override hashCode method to generate a hashCode based on asset_id.
     */
    @Override
    public int hashCode() {
        return Objects.hash(asset_id);
    }

}