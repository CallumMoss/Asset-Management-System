package cs2815.project.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

import cs2815.project.model.ChatBoard;

@RepositoryRestResource
public interface ChatBoardRepo extends JpaRepository<ChatBoard, Integer> {

    @Query("SELECT l FROM ChatBoard l WHERE l.asset.asset_id = :assetId")
    List<ChatBoard> getMessageByAssetId(@Param("assetId") int assetId);

    @Modifying
    @Transactional
    @Query("DELETE FROM ChatBoard l WHERE l.asset.asset_id = :assetID")
    void deleteMessagebyAssetID(@Param("assetID") int assetID);

    @Modifying
    @Transactional
    @Query("UPDATE ChatBoard l SET l.user = null WHERE l.user.id = :userID")
    void eraseUserIdfromChatBoard(@Param("userID") int userID);
}
