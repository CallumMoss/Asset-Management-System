package cs2815.project;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.sql.Timestamp;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import cs2815.project.model.ChatBoard;
import cs2815.project.repo.ChatBoardRepo;
import cs2815.project.service.ChatService;


@SpringBootTest
class ChatBoardBackEndTests {
    @Autowired
    private ChatService chatService;

    @Autowired
    private ChatBoardRepo chatRepo;

    @Test
    void testSendMessageAndDeleteMessage() {
        ChatBoard message = new ChatBoard();
        message.setTextMessage("Test message");
        message.setMessageSent(new Timestamp(System.currentTimeMillis()));

        chatService.sendMessage(message);

        // Retrieve the message from the repository
        List<ChatBoard> messages = chatRepo.findAll();
        assertEquals("Test message", messages.get(0).getTextMessage());

        chatService.deleteMessage(message);
        messages = chatRepo.findAll();
        assertNotNull(messages);
        assertEquals(0, messages.size());
    }
}
