package cs2815.project.service;

import java.util.List;
import cs2815.project.model.AssetType;

public interface AssetTypeService {

    void createAssetType(AssetType assetType);

    void editAssetType(AssetType assetType);

    void deleteAssetType(int assetTypeId);

    List<AssetType> refreshAssetType();

    List<String> searchTypes(String searchword);


}
