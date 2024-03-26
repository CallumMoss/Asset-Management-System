package cs2815.project.controller;

/*
 * Springboot imports:
 */
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/*
 * Imports for project:
 */
import cs2815.project.model.ChatBoard;
import cs2815.project.service.ChatService;

/*
 * Java imports:
 */
import java.util.List;


/**
 * Class for discussion board actions:
 */
@RestController
@RequestMapping("/messages")
public class ChatBoardController {

    //Private fields:
    @Autowired
    private ChatService chatService;

    /**
     * Function to allow communication between users and giving message confirmation.
     * @param message string to be added to discussion board.
     * @return confirmation of message being sent.
     */
    @PostMapping("/send")
    public ResponseEntity<String> sendMessage(@RequestBody ChatBoard message) {
        try {
            chatService.sendMessage(message);
            return ResponseEntity.ok("Message sent successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error sending message");
        }
    }

    /*
    * Function to respond to use of refresh button.
    */
    @GetMapping("/refresh/{asset_id}")
    public ResponseEntity<List<ChatBoard>> refreshMessages(@PathVariable int asset_id) {
        List<ChatBoard> messages = chatService.refresh(asset_id);
        return ResponseEntity.ok(messages);

    }
}