package cs2815.project.service.Implementations;

/*
 * Java imports
 */
import java.sql.Timestamp;
import java.util.List;

/*
 * Springboot imports
 */
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/*
 * Imports for project
 */
import cs2815.project.model.ChatBoard;
import cs2815.project.repo.ChatBoardRepo;
import cs2815.project.service.ChatService;

/**
 * Implementation of the {@link cs2815.project.service.ChatService} interface.
 * Provides methods for sending, deleting, and refreshing chat messages.
 */
@Service
public class ChatServiceImpl implements ChatService {

    @Autowired
    private ChatBoardRepo chatRepo;

    /**
     * Sends a chat message.
     * @param message The message to be sent.
     */
    @Override
    public void sendMessage(ChatBoard message) {

        message.setMessageSent(new Timestamp(System.currentTimeMillis()));
        chatRepo.save(message);
    }

    /**
     * Deletes a chat message.
     * @param message The message to be deleted.
     */
    @Override
    public void deleteMessage(ChatBoard message) {
        if(message == null){return;}
        chatRepo.delete(message);
    }

    /**
     * Refreshes the list of chat messages associated with a specific asset.
     * @param asset_id The ID of the asset for which chat messages need to be refreshed.
     * @return The refreshed list of chat messages.
     */
    @Override
    public List<ChatBoard> refresh(int asset_id) {
        return chatRepo.getMessageByAssetId(asset_id);
    }
}