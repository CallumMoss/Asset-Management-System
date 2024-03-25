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
import java.util.Objects;
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

    private String typeAttribute1;
    private String typeAttribute2;
    private String typeAttribute3;

    public AssetType(String type_name, String description) {
        this.type_name = type_name;
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AssetType assetType = (AssetType) o;
        return type_id == assetType.type_id &&
                Objects.equals(type_name, assetType.type_name) &&
                Objects.equals(description, assetType.description) &&
                Objects.equals(typeAttribute1, assetType.typeAttribute1) &&
                Objects.equals(typeAttribute2, assetType.typeAttribute2) &&
                Objects.equals(typeAttribute3, assetType.typeAttribute3);
    }

    @Override
    public int hashCode() {
        return Objects.hash(type_id, type_name, description, typeAttribute1, typeAttribute2, typeAttribute3);
    }
}
