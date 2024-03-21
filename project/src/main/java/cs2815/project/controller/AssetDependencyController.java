package cs2815.project.controller;

/*
 * Java imports:
 */
import java.util.List;

/*
 * Springboot imports:
 */
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/*
 * Imports created for project:
 */
import cs2815.project.model.AssetDependency;
import cs2815.project.service.AssetDependencyService;

/**
 * Class for different usages of asset dependencies.
 */
@RestController
@RequestMapping("/assetdependency")
public class AssetDependencyController {

    //Private fields:
    @Autowired
    private AssetDependencyService assetDepenedencyService;

    /*
     * Function to respond to use of refresh button.
     */
    @GetMapping("/refresh")
    public ResponseEntity<List<AssetDependency>> refreshAssetType() {
        List<AssetDependency> assetDependencies = assetDepenedencyService.getAllDependencies();
        return ResponseEntity.ok(assetDependencies);
    }

    /*
     * Function to get parent of specified asset.
     */
    @GetMapping("/findparent/{assetId}")
    public ResponseEntity<List<AssetDependency>> findParentasset(@PathVariable int assetId) {
        List<AssetDependency> assetDependencies = assetDepenedencyService.getParentAssets(assetId);
        return ResponseEntity.ok(assetDependencies);
    }

    /*
     * Function to respond to deleting specified dependency.
     */
    @DeleteMapping("/{deleteDependencyId}/{username}")
    public ResponseEntity<String> deleteUser(@PathVariable int deleteDependencyId,
            @PathVariable String username) {
        assetDepenedencyService.deleteDependency(deleteDependencyId, username);
        return ResponseEntity.ok("Dependency deleted successfully");
    }
}