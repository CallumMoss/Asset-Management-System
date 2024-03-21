package cs2815.project.repo;

/*
 * Import for project:
 */
import cs2815.project.model.AssetDependency;

/*
 * Java import:
 */
import java.util.List;

/*
 * Springboot imports:
 */
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

/**
 * Interface for AssetDependencies:
 */
@RepositoryRestResource
public interface AssetDependencyRepo extends JpaRepository<AssetDependency, Integer> {

    /*
     * SQL query for deleting AssetDependency.
     */
    @Modifying
    @Transactional
    @Query("DELETE FROM AssetDependency ad WHERE ad.asset.asset_id = :assetID OR ad.dependent.asset_id = :assetID")
    void deleteAssetbyID(@Param("assetID") int assetID);

    /*
     * SQL query for selecting AssetDependency.
     */
    @Query("SELECT a FROM AssetDependency a WHERE a.dependent.asset_id = :assetId")
    List<AssetDependency> findParentAsset(@Param("assetId") int assetId);
}