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
@Table(name = "dependencies")
public class Dependency {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    // @ManyToMany(mappedBy = "dependencies")
    // private List<Asset> dependentAssets;
}
