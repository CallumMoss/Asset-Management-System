package cs2815.project.service;

import cs2815.project.model.Asset;
import cs2815.project.model.specialmodels.AssetWrapper;

import java.util.List;

public interface AssetService {

    void createAsset(AssetWrapper asset);

    List<Asset> searchAsset(String searchString);

    List<String> searchLanguage(String searchString);
}
