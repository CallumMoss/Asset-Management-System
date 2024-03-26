package cs2815.project.service;

/*
 * Imports for project:
 */
import cs2815.project.model.Asset;
import cs2815.project.model.specialmodels.AssetWrapper;

/*
 * Java imports:
 */
import java.util.AbstractMap;
import java.util.List;

/**
 * Interface for Assets.
 */
public interface AssetService {

    //Function declarations:
    void createAsset(AssetWrapper asset, String username);

    void deleteAsset(int assetID, String username);

    void editAsset(AssetWrapper assetWrapper, String username);

    Asset getNewestAsset();

    Asset getAssetById(int assetId);

    List<Asset> refresh();

    List<Asset> searchByType(String searchString);

    List<Asset> searchByName(String searchString);

    List<Asset> searchByAuthor(String searchString);

    void createBaseAssets();

    List<AbstractMap.SimpleEntry<String, List<AbstractMap.SimpleEntry<String, List<String>>>>> getAssetsAndAttributes();

    // orderBy accepts "Oldest" or "Newest", anything else will return
    // alphabetically.
    List<Asset> sort(List<Asset> unsortedAssets, String orderBy);
}