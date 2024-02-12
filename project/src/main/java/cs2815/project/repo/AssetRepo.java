package cs2815.project.repo;

import cs2815.project.model.Asset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

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
}
