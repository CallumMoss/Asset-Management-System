package cs2815.project.controller;

/**
 * Imports for AssetController:
 */
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import cs2815.project.model.Asset;
import cs2815.project.model.specialmodels.AssetWrapper;
import cs2815.project.service.AssetService;
import java.util.AbstractMap;
import java.util.List;
import java.util.Map;

/**
 * AssetController for all asset functions that will be used in this project.
 */
@RestController
@RequestMapping("/assets")
public class AssetController {

    //Private fields:
    @Autowired
    private AssetService assetService;

    /*
     * Function to respond to new asset creation.
     */
    @PostMapping("/createasset/{username}")
    public ResponseEntity<String> createAsset(@RequestBody AssetWrapper assetWrapper, @PathVariable String username) {

        try {
            assetService.createAsset(assetWrapper, username);
            return ResponseEntity.ok("Asset created successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to create asset. " + e.getMessage());
        }
    }

    /*
     * Function to respond to the use of refresh button in front end.
     */
    @GetMapping("/refresh")
    public ResponseEntity<List<Asset>> refresh() {
        return ResponseEntity.ok(assetService.refresh());
    }

    /*
     * Function to get newest asset made.
     */
    @GetMapping("/getnewest")
    public ResponseEntity<Asset> getNewest() {
        return ResponseEntity.ok(assetService.getNewestAsset());
    }

    /*
     * Function to search via languages.
     */
    @PostMapping("/search/language")
    public ResponseEntity<List<String>> searchLanguage(@RequestBody Map<String, String> searchString) {
        List<String> compatibleLanguages = assetService.searchLanguage(searchString.get("searchTerm"));
        return ResponseEntity.ok(compatibleLanguages);
    }

    /*
     * Function to search via assetType.
     */
    @PostMapping("/search/type")
    public ResponseEntity<List<Asset>> searchByType(@RequestBody Map<String, String> searchString) {
        List<Asset> compatibleLanguages = assetService.searchByType(searchString.get("searchTerm"));
        return ResponseEntity.ok(compatibleLanguages);
    }

    /*
     * Function to search via author.
     */
    @PostMapping("/search/author")
    public ResponseEntity<List<Asset>> searchByAuthor(@RequestBody Map<String, String> searchString) {
        List<Asset> compatibleLanguages = assetService.searchByAuthor(searchString.get("searchTerm"));
        return ResponseEntity.ok(compatibleLanguages);
    }

    /*
     * Function to search via title of asset.
     */
    @PostMapping("/search/title")
    public ResponseEntity<List<Asset>> searchByName(@RequestBody Map<String, String> searchString) {
        List<Asset> compatibleAssets = assetService.searchByName(searchString.get("searchTerm"));
        return ResponseEntity.ok(compatibleAssets);
    }

    /*
     * Function to respond to deleting specified asset.
     */
    @DeleteMapping("/{asset_id}/username={username}")
    public ResponseEntity<String> deleteAsset(@PathVariable int asset_id, @PathVariable String username) {
        assetService.deleteAsset(asset_id, username);
        return ResponseEntity.ok("Asset deleted successfully");
    }

    /*
     * Function to respond to editing specified asset.
     */
    @PostMapping("/edit")
    public ResponseEntity<String> editUser(@RequestBody Asset asset) {
        assetService.editAsset(asset);
        return ResponseEntity.ok("Asset edited successfully");
    }

    /*
     * //Finds what Assets are dependant on the given AssetID asset
     * //Way of testing if process works in postman (it does ;) )
     * 
     * @PostMapping("/isDependantOn")
     * public ResponseEntity<List<Integer>> isDependantOn(@RequestBody int assetId)
     * {
     * List<Integer> dependantOn = assetService.isDependantOn(assetId);
     * return ResponseEntity.ok(dependantOn);
     * }
     * 
     * //Finds the Assets that the given AssetID depends On
     * //Way of testing if process works in postman (it does ;) )
     * 
     * @PostMapping("/isParentOf")
     * public ResponseEntity<List<Integer>> isParentOf(@RequestBody int assetId) {
     * List<Integer> dependencies = assetService.isParentOf(assetId);
     * return ResponseEntity.ok(dependencies);
     *
     * }
     */

     /*
      * Function to get assets and attributes.
      */
    @PostMapping("/attributes")
    public ResponseEntity<List<AbstractMap.SimpleEntry<String, List<AbstractMap.SimpleEntry<String, List<String>>>>>> getAssetsAndAttributes() {
        List<AbstractMap.SimpleEntry<String, List<AbstractMap.SimpleEntry<String, List<String>>>>> assetsAndAttributes = assetService
                .getAssetsAndAttributes();
        return ResponseEntity.ok(assetsAndAttributes);
    }

    @PostMapping("/sort") // orderBy accepts "Oldest" or "Newest", anything else will return
                          // alphabetically.
    public ResponseEntity<List<Asset>> sort(@RequestBody List<Asset> unsortedAssets, @RequestParam String orderBy) {
        List<Asset> sortedAssets = assetService.sort(unsortedAssets, orderBy);
        return ResponseEntity.ok(sortedAssets);
    }
}