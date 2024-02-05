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
@Table(name = "asset_attribute_values")
public class AssetAttributeValue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int value_id;

    @ManyToOne
    @JoinColumn(name = "belonging_to_asset_id")
    private Asset asset;

    @ManyToOne
    @JoinColumn(name = "asset_type")
    private AssetType assetType;

    @ManyToOne
    @JoinColumn(name = "attribute_type_id")
    private AssetAttribute attributeType;

    private String value;
}
