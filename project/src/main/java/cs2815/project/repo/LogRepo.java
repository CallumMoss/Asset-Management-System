package cs2815.project.repo;

import cs2815.project.model.Log;
import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface LogRepo extends JpaRepository<Log, Integer> {
    @Modifying
    @Transactional
    @Query("UPDATE Log l SET l.user = null WHERE l.user.id = :userId")
    void eraseUserIdFromLogs(@Param("userId") int userId);

    @Modifying
    @Transactional
    @Query("UPDATE Log l SET l.asset = null WHERE l.asset.asset_id = :assetId")
    void eraseAssetIdFromLogs(@Param("assetId") int assetId);
}
