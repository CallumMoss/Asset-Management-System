package cs2815.project.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@Table(name = "asset_types")

public class AssetType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int type_id;

    private String type_name;

    private String description;

    public AssetType(String type_name, String description) {
        this.type_name = type_name;
        this.description = description;
    }

}
