package cs2815.project.repo;

import cs2815.project.model.AssetTypes;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface AssetTypesRepo extends JpaRepository<AssetTypes, String> {

    @Query("SELECT t FROM AssetTypes t WHERE t.type_name = :type_name")
    AssetTypes findByAssetType(@Param("type_name") String type_name);

}
