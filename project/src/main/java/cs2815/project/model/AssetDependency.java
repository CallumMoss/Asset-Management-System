package cs2815.project.model;

/*
 * Imports:
 */
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Column;
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

/**
 * Model Asset dependency structure.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "dependency")
public class AssetDependency {

    //Private fields:
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "asset_id")
    @JsonIgnoreProperties(value = "dependencies", allowSetters = true)
    private Asset asset;

    @ManyToOne
    @JoinColumn(name = "dependent_id")

    private Asset dependent;
    @Column(name = "relation_type")
    private String relationType;
}