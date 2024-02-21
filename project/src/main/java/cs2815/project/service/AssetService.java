package cs2815.project.service;

import cs2815.project.model.Asset;
import cs2815.project.model.specialmodels.AssetWrapper;

import java.util.List;

public interface AssetService {

    void createAsset(AssetWrapper asset);

    void deleteAsset(int assetID);

    List<Asset> refresh();

    List<String> searchLanguage(String searchString);

    //Finds what Assets are dependant on the given AssetID asset
    List<Integer> isDependantOn(int assetId);

    //Finds the Assets that the given AssetID depends On
    List<Integer> isParentOf(int assetId);
}
