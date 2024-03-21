package cs2815.project.repo;

/*
 * Imports:
 */
import cs2815.project.model.Log;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import java.util.List;

/**
 * Interface for Log repository.
 */
@RepositoryRestResource
public interface LogRepo extends JpaRepository<Log, Integer> {
    
    /**
     * Removes a user ID from all logs.
     *
     * @param userId The ID of the user to be removed from logs.
     */
    @Modifying
    @Transactional
    @Query("UPDATE Log l SET l.user = null WHERE l.user.id = :userId")
    void eraseUserIdFromLogs(@Param("userId") int userId);

    /**
     * Removes an asset ID from all logs.
     *
     * @param assetId The ID of the asset to be removed from logs.
     */
    @Modifying
    @Transactional
    @Query("UPDATE Log l SET l.asset = null WHERE l.asset.asset_id = :assetId")
    void eraseAssetIdFromLogs(@Param("assetId") int assetId);

    /**
     * Retrieves all logs ordered by update timestamp in descending order.
     *
     * @return A list of logs ordered by update timestamp in descending order.
     */
    @Query("SELECT l FROM Log l ORDER BY l.updateTimestamp DESC")
    List<Log> findAllOrderedByUpdateTimestampDesc();

    /**
     * Retrieves all update descriptions from logs.
     *
     * @return A list of all update descriptions from logs.
     */
    @Query("SELECT l.updateDescription FROM Log l")
    List<String> findAllDescriptions();

    /**
     * Retrieves logs by a specific update description.
     *
     * @param Description The update description to search for.
     * @return A list of logs with the specified update description.
     */
    @Query("SELECT l FROM Log l WHERE l.updateDescription = :Description")
    List<Log> getLogByDescription(@Param("Description") String Description);

    /**
     * Retrieves logs associated with a specific asset ID.
     *
     * @param assetId The ID of the asset.
     * @return A list of logs associated with the specified asset ID.
     */
    @Query("SELECT l FROM Log l WHERE l.asset.asset_id = :assetId")
    List<Log> getLogByAssetId(@Param("assetId") int assetId);
}