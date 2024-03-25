package cs2815.project.controller;

import java.util.AbstractMap;
import java.util.List;
import java.util.Map;

import cs2815.project.model.Asset;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import cs2815.project.model.AssetType;
import cs2815.project.service.AssetTypeService;

@RestController
@RequestMapping("/asset_types")
public class AssetTypeController {

    @Autowired
    private AssetTypeService assetTypeService;

    @PostMapping("/create/{username}")
    public ResponseEntity<String> createAssetType(@RequestBody AssetType assetType, @PathVariable String username) {
        assetTypeService.createAssetType(assetType, username);
        return ResponseEntity.status(HttpStatus.CREATED).body("Asset type created successfully");
    }

    @PostMapping("/edit/{username}")
    public ResponseEntity<String> editAssetType(@RequestBody AssetType assetType, @PathVariable String username) {
        assetTypeService.editAssetType(assetType, username);
        return ResponseEntity.ok("Asset type edited successfully");
    }

    @DeleteMapping("/{asset_type_id}/{username}")
    public ResponseEntity<String> deleteAssetType(@PathVariable int asset_type_id, @PathVariable String username) {
        assetTypeService.deleteAssetType(asset_type_id, username);
        return ResponseEntity.ok("Asset type deleted successfully");
    }

    @GetMapping("/refresh")
    public ResponseEntity<List<AssetType>> refreshAssetType() {
        List<AssetType> assetTypes = assetTypeService.refreshAssetType();
        return ResponseEntity.ok(assetTypes);
    }

    @PostMapping("/search")
    public ResponseEntity<List<AssetType>> searchTypes(@RequestBody Map<String, String> searchString) {
        System.out.println(searchString);
        List<AssetType> compatibleUsernames = assetTypeService.searchTypes(searchString.get("searchTerm"));
        return ResponseEntity.ok(compatibleUsernames);
    }

    @PostMapping("/attributes")
    public ResponseEntity<List<AbstractMap.SimpleEntry<String, List<String>>>> getTypesAndAttributes() {
        List<AbstractMap.SimpleEntry<String, List<String>>> attributeTitles = assetTypeService.getTypesAndAttributes();
        return ResponseEntity.ok(attributeTitles);
    }

    @PostMapping("/attributesByType")
    public ResponseEntity<List<String>> getAttributes(@RequestBody AssetType assetType) {
        List<String> attributeTitles = assetTypeService.getAttributes(assetType);
        return ResponseEntity.ok(attributeTitles);
    }

    @PostMapping("/sort") // orderBy accepts "Oldest" or "Newest", anything else will return
                          // alphabetically.
    public ResponseEntity<List<AssetType>> sort(@RequestBody List<AssetType> unsortedAssetTypes,
            @RequestParam String orderBy) {
        List<AssetType> sortedAssetTypes = assetTypeService.sort(unsortedAssetTypes, orderBy);
        return ResponseEntity.ok(sortedAssetTypes);
    }
}
