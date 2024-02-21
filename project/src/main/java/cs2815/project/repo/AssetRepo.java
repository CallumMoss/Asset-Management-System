package cs2815.project.repo;

import cs2815.project.model.Asset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RepositoryRestResource
public interface AssetRepo extends JpaRepository<Asset, Integer> { // Integer being the type of the primary key

    // does createAsset need to go here?

    @Query("SELECT a FROM Asset a")
    List<Asset> getAllAssets();

    @Query("SELECT a FROM Asset a WHERE a.asset_id = :assetId")
    Asset findAssetById(@Param("assetId") int assetId);

    @Query("SELECT a FROM Asset a WHERE a.title = :title")
    Asset findAssetByTitle(@Param("title") String title);

    @Modifying
    @Transactional
    @Query("DELETE FROM Asset at WHERE at.asset_id = :assetID")
    void deleteAssetbyID(@Param("assetID") int assetID);

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
}
