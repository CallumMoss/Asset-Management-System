package cs2815.project.repo;

import cs2815.project.model.Asset;
import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface AssetRepo extends JpaRepository<Asset, Integer> { // Integer being the type of the primary key

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO asset_languages (asset_id, language_name) VALUES (:assetId, :languageName)", nativeQuery = true)
    void addLanguageToAsset(@Param("assetId") int assetId, @Param("languageName") String languageName);
}
