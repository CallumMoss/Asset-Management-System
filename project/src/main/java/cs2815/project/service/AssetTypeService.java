package cs2815.project.service;

import java.util.AbstractMap;
import java.util.List;

import cs2815.project.model.Asset;
import cs2815.project.model.AssetType;

public interface AssetTypeService {

    void createAssetType(AssetType assetType);

    void editAssetType(AssetType assetType);

    void deleteAssetType(int assetTypeId);

    List<AssetType> refreshAssetType();

    List<AssetType> searchTypes(String searchword);

    void createBaseTypes();

    List<AbstractMap.SimpleEntry<String, List<String>>> getTypesAndAttributes();

    List<AssetType> sortAlphabetically(List<AssetType> unsortedAssetTypes);

    List<String> getAttributes(AssetType assetType);
}
