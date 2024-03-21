package cs2815.project.model;

/*
 * Imports:
 */
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Model for AssetType structure.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "asset_types")
public class AssetType {
    //Private fields:
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int type_id;
    private String type_name;
    private String description;
    private String typeAttribute1;
    private String typeAttribute2;
    private String typeAttribute3;

    /*
     * Constructor for AssetType.
     */
    public AssetType(String type_name, String description) {
        this.type_name = type_name;
        this.description = description;
    }
}