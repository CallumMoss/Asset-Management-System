package cs2815.project.service;

import java.util.List;

import cs2815.project.model.ChatBoard;

public interface ChatService {
    void sendMessage(ChatBoard message);

    void deleteMessage(ChatBoard message);

    List<ChatBoard> refresh(int asset_id);

}
