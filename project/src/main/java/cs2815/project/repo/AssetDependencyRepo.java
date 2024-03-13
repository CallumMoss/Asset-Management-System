package cs2815.project.repo;

import cs2815.project.model.AssetDependency;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

@RepositoryRestResource
public interface AssetDependencyRepo extends JpaRepository<AssetDependency, Integer> {

    @Modifying
    @Transactional
    @Query("DELETE FROM AssetDependency ad WHERE ad.asset.asset_id = :assetID OR ad.dependent.asset_id = :assetID")
    void deleteAssetbyID(@Param("assetID") int assetID);

    @Query("SELECT a FROM AssetDependency a WHERE a.dependent.asset_id = :assetId")
    List<AssetDependency> findParentAsset(@Param("assetId") int assetId);
}
