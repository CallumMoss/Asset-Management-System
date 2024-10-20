package cs2815.project.model;

/*
 * Imports:
 */
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.sql.Timestamp;

/**
 * Model for Discussion board to let users communicate.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "ChatBoard")
public class ChatBoard {

    //Private fields:
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int messageId;

    @ManyToOne
    @JoinColumn(name = "asset_id")
    private Asset asset;

    private String textMessage;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private Timestamp messageSent;
}