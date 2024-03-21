package cs2815.project.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import cs2815.project.model.AssetDependency;
import cs2815.project.service.AssetDependencyService;

@RestController
@RequestMapping("/assetdependency")
public class AssetDependencyController {

    @Autowired
    private AssetDependencyService assetDepenedencyService;

    @GetMapping("/refresh")
    public ResponseEntity<List<AssetDependency>> refreshAssetType() {
        List<AssetDependency> assetDependencies = assetDepenedencyService.getAllDependencies();
        return ResponseEntity.ok(assetDependencies);
    }

    @GetMapping("/findparent/{assetId}")
    public ResponseEntity<List<AssetDependency>> findParentasset(@PathVariable int assetId) {
        List<AssetDependency> assetDependencies = assetDepenedencyService.getParentAssets(assetId);
        return ResponseEntity.ok(assetDependencies);
    }

    @DeleteMapping("/{deleteDependencyId}/{username}")
    public ResponseEntity<String> deleteUser(@PathVariable int deleteDependencyId,
            @PathVariable String username) {
        assetDepenedencyService.deleteDependency(deleteDependencyId, username);
        return ResponseEntity.ok("Dependency deleted successfully");
    }

    @PostMapping("/search/parent")
    public ResponseEntity<List<AssetDependency>> searchParents(@RequestBody String searchString) {
        System.out.println(searchString);
        List<AssetDependency> compatibleDependencies = assetDepenedencyService.searchParents(searchString);
        System.out.println(compatibleDependencies);
        return ResponseEntity.ok(compatibleDependencies);
    }

    @PostMapping("/search/dependencies")
    public ResponseEntity<List<AssetDependency>> searchChild(@RequestBody String searchString) {
        List<AssetDependency> compatibleDependencies = assetDepenedencyService.searchChild(searchString);
        return ResponseEntity.ok(compatibleDependencies);
    }
}
