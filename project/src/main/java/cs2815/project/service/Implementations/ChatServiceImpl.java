package cs2815.project.service.Implementations;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cs2815.project.model.ChatBoard;
import cs2815.project.repo.ChatBoardRepo;
import cs2815.project.service.ChatService;

@Service
public class ChatServiceImpl implements ChatService {

    @Autowired
    private ChatBoardRepo chatRepo;

    @Override
    public void sendMessage(ChatBoard message) {

        message.setMessageSent(new Timestamp(System.currentTimeMillis()));
        chatRepo.save(message);
    }

    @Override
    public void deleteMessage(ChatBoard message) {
        chatRepo.delete(message);
    }

    @Override
    public List<ChatBoard> refresh(int asset_id) {
        return chatRepo.getMessageByAssetId(asset_id);
    }

}
