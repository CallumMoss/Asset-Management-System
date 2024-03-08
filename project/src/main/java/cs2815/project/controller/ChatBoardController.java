package cs2815.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cs2815.project.model.ChatBoard;
import cs2815.project.service.ChatService;

import java.util.List;

@RestController
@RequestMapping("/messages")
public class ChatBoardController {

    @Autowired
    private ChatService chatService;

    @PostMapping("/send")
    public void sendMessage(@RequestBody ChatBoard message) {
        chatService.sendMessage(message);
    }

    @GetMapping("/refresh/{asset_id}")
    public ResponseEntity<List<ChatBoard>> refreshMessages(@PathVariable int asset_id) {
        List<ChatBoard> messages = chatService.refresh(asset_id);
        return ResponseEntity.ok(messages);

    }

}
