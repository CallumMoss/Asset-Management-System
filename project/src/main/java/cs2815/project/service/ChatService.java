package cs2815.project.service;

/*
 * Java imports:
 */
import java.util.List;

/*
 * Imports for project:
 */
import cs2815.project.model.ChatBoard;

/*
 * Interface for Discussion board:
 */
public interface ChatService {

    //Function Declarations:
    void sendMessage(ChatBoard message);

    void deleteMessage(ChatBoard message);

    List<ChatBoard> refresh(int asset_id);
}