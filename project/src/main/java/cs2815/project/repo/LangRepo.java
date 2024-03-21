package cs2815.project.repo;

/*
 * Imports for project.
 */
import cs2815.project.model.Languages;

/*
 * Springboot imports:
 */
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

/*
 * Java imports:
 */
import java.util.List;

/**
 * Interface for Language repository.
 */
@RepositoryRestResource
public interface LangRepo extends JpaRepository<Languages, Integer> { // Integer being the type of the primary key
   
    /**
     * Retrieves all language names.
     *
     * @return A list of all language names.
     */
    @Query("SELECT l.language_name FROM Languages l ")
    List<String> getAllLanguageNames();

    /**
     * Finds a language by its ID.
     *
     * @param langID The ID of the language.
     * @return The language with the specified ID.
     */
    @Query("SELECT l FROM Languages l WHERE l.language_id = :langID")
    Languages findLanguageById(@Param("langID") int langID);

    /**
     * Finds a language by its name.
     *
     * @param langName The name of the language.
     * @return The language with the specified name.
     */
    @Query("SELECT l FROM Languages l WHERE l.language_name = :langName")
    Languages findLanguageByName(@Param("langName") String langName);

    /**
     * Deletes a language by its ID.
     *
     * @param langID The ID of the language to be deleted.
     */
    @Modifying
    @Transactional
    @Query("DELETE FROM Languages l WHERE l.language_id = :langID")
    void deleteLanguageByID(@Param("langID") int langID);

    /**
     * Retrieves all languages.
     *
     * @return A list of all languages.
     */
    @Query("SELECT l FROM Languages l")
    List<Languages> getLanguages();
}