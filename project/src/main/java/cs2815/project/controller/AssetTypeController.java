package cs2815.project.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import cs2815.project.model.AssetType;
import cs2815.project.service.AssetTypeService;

@RestController
@RequestMapping("/asset_types")
public class AssetTypeController {

    @Autowired
    private AssetTypeService assetTypeService;

    @PostMapping("/create")
    public ResponseEntity<String> createAssetType(@RequestBody AssetType assetType) {
        assetTypeService.createAssetType(assetType);
        return ResponseEntity.status(HttpStatus.CREATED).body("Asset type created successfully");
    }

    @PostMapping("/edit")
    public ResponseEntity<String> editAssetType(@RequestBody AssetType assetType) {
        assetTypeService.editAssetType(assetType);
        return ResponseEntity.ok("Asset type edited successfully");
    }

    @DeleteMapping("/{asset_type_id}")
    public ResponseEntity<String> deleteAssetType(@PathVariable int asset_type_id) {
        assetTypeService.deleteAssetType(asset_type_id);
        return ResponseEntity.ok("Asset type deleted successfully");
    }

    @GetMapping("/refresh")
    public ResponseEntity<List<AssetType>> refreshAssetType() {
        List<AssetType> assetTypes = assetTypeService.refreshAssetType();
        return ResponseEntity.ok(assetTypes);
    }

    @PostMapping("/search")
    public ResponseEntity<List<AssetType>> searchTypes(@RequestBody Map<String,String> searchString) {
        List<AssetType> compatibleUsernames = assetTypeService.searchTypes(searchString.get("searchTerm"));
        return ResponseEntity.ok(compatibleUsernames);
    }
}
