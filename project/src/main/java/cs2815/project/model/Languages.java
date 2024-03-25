package cs2815.project.model;

/*
 * Imports:
 */
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Model for languages.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "languages")
public class Languages {
    //Private fields:
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int language_id;

    private String language_name;

    public Languages(String language_name) {
        this.language_name = language_name;
    }
}