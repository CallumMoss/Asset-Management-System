package cs2815.project.model.specialmodels;

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
    private String title;
    private String asset_description;
    private String link;
    private String asset_type; // Assuming a string for asset type
    private List<String> authors; // Assuming a list of author names
    private List<DependencyWrapper> dependencies; // Assuming a list of dependency titles
    private List<String> languages;
}
