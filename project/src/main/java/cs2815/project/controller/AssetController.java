package cs2815.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import cs2815.project.model.Asset;

import cs2815.project.model.specialmodels.AssetWrapper;

import cs2815.project.service.AssetService;
import java.util.List;

@RestController
@RequestMapping("/assets")
public class AssetController {

    @Autowired
    private AssetService assetService;

    @PostMapping("/createasset")
    public ResponseEntity<String> createAsset(@RequestBody AssetWrapper assetWrapper) {
        try {
            assetService.createAsset(assetWrapper);
            return ResponseEntity.ok("Asset created successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to create asset. " + e.getMessage());
        }
    }

    @GetMapping("/refresh")
    public ResponseEntity<List<Asset>> refresh() {

        return ResponseEntity.ok(assetService.refresh());

    }

    @PostMapping("/searchAsset")
    public ResponseEntity<List<Asset>> searchAsset(@RequestBody String searchString) {
        List<Asset> compatibleAssets = assetService.searchAsset(searchString);
        return ResponseEntity.ok(compatibleAssets);
    }

    @PostMapping("/searchLanguage")
    public ResponseEntity<List<String>> searchLanguage(@RequestBody String searchString) {
        List<String> compatibleLanguages = assetService.searchLanguage(searchString);
        return ResponseEntity.ok(compatibleLanguages);
    }

}
