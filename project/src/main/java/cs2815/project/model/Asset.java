package cs2815.project.model;

import java.sql.Timestamp;
import java.util.*;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int asset_id;

    private String title;
    private String asset_description;
    private String link;
    private String langList;
    private long asset_languages;

    private Timestamp updateTimestamp;

    @ManyToOne
    @JoinColumn(name = "asset_type_id")
    private AssetType Asset_type;

    @ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH,
            CascadeType.REFRESH })
    @JoinTable(name = "asset_user", joinColumns = @JoinColumn(name = "asset_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<User> authors;

    @ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH,
            CascadeType.REFRESH })
    @JoinTable(name = "dependency", joinColumns = @JoinColumn(name = "asset_id"), inverseJoinColumns = @JoinColumn(name = "belonging_id"))
    private List<Asset> dependent;

    public void addLanguageID(int languageID) {
        String strLanguages = Long.toString(asset_languages);
        if ((strLanguages.length() / 3) < 5) {
            strLanguages += languageID;
            this.asset_languages = Long.parseLong(strLanguages);
        }
    }

    public static List<String> languages = new ArrayList<>(Arrays.asList(
            "Java", "Python", "C", "C++", "JavaScript", "C#", "PHP", "Swift", "Objective-C",
            "TypeScript", "Ruby", "Go", "Rust", "Kotlin", "Perl", "Scala", "HTML", "CSS",
            "SQL", "Shell", "Assembly", "R", "Dart", "Haskell", "Lua", "Julia", "MATLAB",
            "Groovy", "Clojure", "VBScript", "Pascal", "Fortran", "Ada", "Lisp", "Scheme",
            "Prolog", "Erlang", "D", "Dylan", "Smalltalk", "Tcl", "Elixir", "Racket", "COBOL",
            "F#", "PowerShell", "Bash", "Objective-J", "Delphi", "LabVIEW", "Scratch", "PL/SQL"));

    public static HashMap<String, Integer> languageIDMap = createLanguageIDMap(languages);

    public static HashMap<String, Integer> createLanguageIDMap(List<String> languages) {
        HashMap<String, Integer> map = new HashMap<>();
        int baseLine = 100;
        for (String language : languages) {
            map.put(language, baseLine++);
        }
        return map;
    }

    public boolean isSearched(List<Integer> compatibleLangIDs) {
        long number = asset_languages;
        while (number != 0) {
            int digit = (int) (number % 1000);
            if (compatibleLangIDs.contains(digit)) {
                return true;
            }
            number /= 1000;
        }
        return false;
    }
}
