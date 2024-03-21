package cs2815.project.repo;

/*
 * Java Imports:
 */
import java.util.List;

/*
 * SpringBoot imports:
 */
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

/*
 * Imports for project:
 */
import cs2815.project.model.ChatBoard;

/**
 * Interface for Chatboard repository.
 */
@RepositoryRestResource
public interface ChatBoardRepo extends JpaRepository<ChatBoard, Integer> {
    /**
     * Retrieves messages from ChatBoard associated with a specific asset ID.
     *
     * @param assetId The ID of the asset.
     * @return A list of ChatBoard messages associated with the specified asset ID.
     */
    @Query("SELECT l FROM ChatBoard l WHERE l.asset.asset_id = :assetId")
    List<ChatBoard> getMessageByAssetId(@Param("assetId") int assetId);

    /**
     * Deletes messages from ChatBoard associated with a specific asset ID.
     *
     * @param assetID The ID of the asset.
     */
    @Modifying
    @Transactional
    @Query("DELETE FROM ChatBoard l WHERE l.asset.asset_id = :assetID")
    void deleteMessagebyAssetID(@Param("assetID") int assetID);

    /**
     * Removes a user ID from ChatBoard entries.
     *
     * @param userID The ID of the user to be removed.
     */
    @Modifying
    @Transactional
    @Query("UPDATE ChatBoard l SET l.user = null WHERE l.user.id = :userID")
    void eraseUserIdfromChatBoard(@Param("userID") int userID);
}