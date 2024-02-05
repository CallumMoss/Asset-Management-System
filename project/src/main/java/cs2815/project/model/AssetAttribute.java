package cs2815.project.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
@Table(name = "asset_attributes")
public class AssetAttribute {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int asset_attribute_id;

    @ManyToOne
    @JoinColumn(name = "asset_type")
    private AssetType assetType;

    private String attribute_name;
    private String attribute_description;
}
