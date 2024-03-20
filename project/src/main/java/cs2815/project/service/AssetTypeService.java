package cs2815.project.service;

import java.util.AbstractMap;
import java.util.List;

import cs2815.project.model.Asset;
import cs2815.project.model.AssetType;

public interface AssetTypeService {

    void createAssetType(AssetType assetType, String username);

    void editAssetType(AssetType assetType, String username);

    void deleteAssetType(int assetTypeId, String username);

    List<AssetType> refreshAssetType();

    List<AssetType> searchTypes(String searchword);

    void createBaseTypes();

    List<AbstractMap.SimpleEntry<String, List<String>>> getTypesAndAttributes();

    List<AssetType> sort(List<AssetType> unsortedAssetTypes, String orderBy);

    List<String> getAttributes(AssetType assetType);
}
