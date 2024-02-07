package cs2815.project.service;

import java.util.List;
import cs2815.project.model.AssetType;

public interface AssetTypeService {

    public void createAssetType(AssetType assetType);

    public void editAssetType(AssetType assetType);

    public void deleteAssetType(int assetTypeId);

    public List<AssetType> refreshAssetType();

}
