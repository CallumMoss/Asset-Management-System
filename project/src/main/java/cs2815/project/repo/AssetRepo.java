package cs2815.project.repo;

/*
 * Imports for project:
 */
import cs2815.project.model.Asset;
import cs2815.project.model.AssetType;
import cs2815.project.model.User;

/*
 * Springboot imports:
 */
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

/*
 * Java import:
 */
import java.util.List;

/**
 * Interface for Asset repository.
 */
@RepositoryRestResource
public interface AssetRepo extends JpaRepository<Asset, Integer> { // Integer being the type of the primary key

/**
 * Retrieves all assets.
 * @return List of assets.
 */
@Query("SELECT a FROM Asset a")
List<Asset> getAllAssets();

/**
 * Retrieves all assets with pagination.
 * @param pageable Pagination information.
 * @return Page of assets.
 */
@Query("SELECT a FROM Asset a")
Page<Asset> findAll(Pageable pageable);


/**
 * Retrieves all asset types.
 * @return List of asset types.
 */
@Query("SELECT at.type_name FROM AssetType at")
List<String> getAllTypes();

/**
 * Retrieves an asset by its name.
 * @param assetName Name of the asset.
 * @return Asset with the given name.
 */
@Query("SELECT a FROM Asset a WHERE a.title = :assetName")
Asset getAssetByName(@Param("assetName") String assetName);

/**
 * Retrieves an asset by its ID.
 * @param assetId ID of the asset.
 * @return Asset with the given ID.
 */
@Query("SELECT a FROM Asset a WHERE a.asset_id = :assetId")
Asset findAssetById(@Param("assetId") int assetId);

/**
 * Retrieves assets with a specific title.
 * @param title Title of the assets.
 * @return List of assets with the given title.
 */
@Query("SELECT a FROM Asset a WHERE a.title = :title")
List<Asset> findAssetByTitle(@Param("title") String title);

/**
 * Retrieves assets with a specific type.
 * @param typeName Type name of the assets.
 * @return List of assets with the given type.
 */
@Query("SELECT a FROM Asset a WHERE a.Asset_type.type_name = :typeName")
List<Asset> findAssetByType(@Param("typeName") String typeName);

/**
 * Retrieves attributes of an asset by its ID.
 * @param assetId ID of the asset.
 * @return List of attributes of the asset.
 */
@Query("SELECT at.typeAttributeValue1, at.typeAttributeValue2, at.typeAttributeValue3 FROM Asset at WHERE at.asset_id = :assetId")
List<String> getAssetAttributes(@Param("assetId") int assetId);

/**
 * Deletes an asset by its ID.
 * @param assetID ID of the asset to be deleted.
 */

/**
 * Updates fields of an asset by its ID.
 * @param assetId ID of the asset to be updated.
 * @param newTitle New title for the asset.
 * @param newDescription New description for the asset.
 * @param newLink New link for the asset.
 */
@Modifying
@Transactional
@Query("UPDATE Asset a SET a.title = :newTitle, a.asset_description = :newDescription, a.link = :newLink WHERE a.asset_id = :assetID")
void updateAssetFieldsById(@Param("assetID") int assetId, @Param("newTitle") String newTitle, @Param("newDescription") String newDescription, @Param("newLink") String newLink);

    /**
    * Deletes an asset by its ID.
    * @param assetID ID of the asset to be deleted.
    */
    @Modifying
    @Transactional
    @Query("DELETE FROM Asset at WHERE at.asset_id = :assetID")
    void deleteAssetbyID(@Param("assetID") int assetID);

    @Modifying
    @Transactional
    @Query("UPDATE Asset a SET a.title = :newTitle, a.asset_description = :newDescription, a.link = :newLink, a.Asset_type = :newAssetType, "
            +
            "a.typeAttributeValue1 = :newValue1, a.typeAttributeValue2 = :newValue2, a.typeAttributeValue3 = :newValue3 "
            +
            "WHERE a.asset_id = :assetID")
    void updateAssetFieldsById(@Param("assetID") int assetId, @Param("newTitle") String newTitle,
            @Param("newDescription") String newDescription, @Param("newAssetType") AssetType newAssetType,
            @Param("newLink") String newLink,
            @Param("newValue1") String newValue1, @Param("newValue2") String newValue2,
            @Param("newValue3") String newValue3);

    @Modifying
    @Transactional
    @Query("UPDATE Asset a SET a.Asset_type = null WHERE a.Asset_type.id = :AssetTypeId")
    void eraseTypeIdFromAsset(@Param("AssetTypeId") int AssetTypeId);

    @Modifying
    @Transactional
    @Query(nativeQuery = true, value = "DELETE FROM dependency WHERE belonging_id = :belonging_id")
    void eraseUserIdFromDependency(@Param("belonging_id") int belonging_id);

    @Query(nativeQuery = true, value = "SELECT asset_id FROM dependency WHERE belonging_id = :assetId")
    List<Integer> isDependantOn(@Param("assetId") int assetId);

    @Query(nativeQuery = true, value = "SELECT belonging_id FROM dependency WHERE asset_id = :assetId")
    List<Integer> isParentOf(@Param("assetId") int assetId);

    @Query("SELECT a FROM Asset a WHERE :author MEMBER OF a.authors")
    List<Asset> findAssetByAuthor(@Param("author") User author);
}
