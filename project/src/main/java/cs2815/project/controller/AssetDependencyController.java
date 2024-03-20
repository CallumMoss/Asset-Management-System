package cs2815.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
