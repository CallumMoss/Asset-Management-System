package cs2815.project.controller;

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
import cs2815.project.model.Asset;
import cs2815.project.model.User;
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


      @PostMapping("/edit")
    public ResponseEntity<String> editUser(@RequestBody Asset asset) {
        assetService.editAsset(asset);
        return ResponseEntity.ok("Asset edited successfully");
    }

    @PostMapping("/search/language")
    public ResponseEntity<List<String>> searchLanguage(@RequestBody String searchString) {
        List<String> compatibleLanguages = assetService.searchLanguage(searchString);
        return ResponseEntity.ok(compatibleLanguages);
    }

    @PostMapping("/search/type")
    public ResponseEntity<List<Asset>> searchByType(@RequestBody String searchString) {
        List<Asset> compatibleLanguages = assetService.searchByType(searchString);
        return ResponseEntity.ok(compatibleLanguages);
    }

    @PostMapping("/search/title")
    public ResponseEntity<List<Asset>> searchByName(@RequestBody String searchString) {
        List<Asset> compatibleAssets = assetService.searchByName(searchString);
        return ResponseEntity.ok(compatibleAssets);
    }

    @DeleteMapping("/{asset_id}")
    public ResponseEntity<String> deleteAsset(@PathVariable int asset_id) {
        assetService.deleteAsset(asset_id);
        return ResponseEntity.ok("Asset deleted successfully");
    }

    //Finds what Assets are dependant on the given AssetID asset
    //Way of testing if process works in postman (it does ;) )
    @PostMapping("/isDependantOn")
    public ResponseEntity<List<Integer>> isDependantOn(@RequestBody int assetId) {
        List<Integer> dependantOn = assetService.isDependantOn(assetId);
        return ResponseEntity.ok(dependantOn);
    }

    //Finds the Assets that the given AssetID depends On
    //Way of testing if process works in postman (it does ;) )
    @PostMapping("/isParentOf")
    public ResponseEntity<List<Integer>> isParentOf(@RequestBody int assetId) {
        List<Integer> dependencies = assetService.isParentOf(assetId);
        return ResponseEntity.ok(dependencies);
    }

}
