package cs2815.project.repo;

import cs2815.project.model.AssetAttribute;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface AssetAttributeRepo extends JpaRepository<AssetAttribute, Integer> { // Integer being the type of the primary key

    @Query("SELECT a FROM AssetAttribute a WHERE a.asset_attribute_id = :asset_attribute_id")
    AssetAttribute findByAssetAttributeID(@Param("asset_attribute_id") String asset_attribute_id);
    
}
