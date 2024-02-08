package cs2815.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import cs2815.project.model.Asset;
import cs2815.project.service.AssetService;

import java.util.List;

@RestController
@RequestMapping("/assets")
public class AssetController {

    @Autowired
    private AssetService assetService;

    @PostMapping("/createAsset")
    public void createAsset(@RequestBody Asset title) {
        assetService.createAsset(title);
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

