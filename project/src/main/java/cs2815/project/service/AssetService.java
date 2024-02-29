package cs2815.project.service;

import cs2815.project.model.Asset;
import cs2815.project.model.specialmodels.AssetWrapper;

import java.util.List;

public interface AssetService {

    void createAsset(AssetWrapper asset);

    void deleteAsset(int assetID);

    List<Asset> refresh();

    List<String> searchByLanguage(String searchString);

    List<Asset> searchByType(String searchString);

    List<Asset> searchByName(String searchString);
}
