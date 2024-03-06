package cs2815.project.service;

import cs2815.project.model.Asset;
import cs2815.project.model.specialmodels.AssetWrapper;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

public interface AssetService {

    void createAsset(AssetWrapper asset);

    void deleteAsset(int assetID);

    List<Asset> refresh();

    List<String> searchLanguage(String searchString);

    List<Asset> searchByType(String searchString);

    List<Asset> searchByName(String searchString);
    
    List<Integer> isDependantOn(@RequestBody int assetId);

    List<Integer> isParentOf(int assetId);

    void createBaseAssets();
}
