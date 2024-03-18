package cs2815.project.service;

import cs2815.project.model.Asset;
import cs2815.project.model.specialmodels.AssetWrapper;

import java.util.AbstractMap;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestBody;

public interface AssetService {

    void createAsset(AssetWrapper asset);

    void deleteAsset(int assetID);

    void editAsset(Asset asset);
    
    Asset getNewestAsset();

    List<Asset> refresh();

    List<String> searchLanguage(String searchString);

    List<Asset> searchByType(String searchString);

    List<Asset> searchByName(String searchString);

    List<Asset> searchByAuthor(String searchString);

    void createBaseAssets();

    List<AbstractMap.SimpleEntry<String, List<AbstractMap.SimpleEntry<String, List<String>>>>> getAssetsAndAttributes();

    List<Asset> sortAlphabetically(List<Asset> unsortedAssets);
}
