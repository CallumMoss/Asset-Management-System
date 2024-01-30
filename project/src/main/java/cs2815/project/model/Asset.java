package cs2815.project.model;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "assets")
public class Asset {
    @Id
    private int asset_id;
    private String link;
    private String asset_description;
    private String title;

    @ManyToOne
    @JoinColumn(name = "asset_type")
    private AssetType asset_type;

    private Date upload_date;

    @ManyToOne
    @JoinColumn(name = "author")
    private User author;
}
