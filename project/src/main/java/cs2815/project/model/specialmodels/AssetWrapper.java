package cs2815.project.model.specialmodels;

/*
 * Imports:
 */
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AssetWrapper {
    //Private fields:
    private int asset_id;
    private String title;
    private String asset_description;
    private String link;
    private String asset_type; // Assuming a string for asset type
    private List<String> authors; // Assuming a list of author names
    private List<DependencyWrapper> dependencies; // Assuming a list of dependency titles
    private String typeAttributeValue1;
    private String typeAttributeValue2;
    private String typeAttributeValue3;
}