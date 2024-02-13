package cs2815.project.repo;

import cs2815.project.model.Asset;
import cs2815.project.model.Languages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RepositoryRestResource
public interface LangRepo extends JpaRepository<Languages, Integer> { // Integer being the type of the primary key

    @Query("SELECT l.language_name FROM Languages l ")
    List<String> getAllLanguageNames();

    
    @Query("SELECT l FROM Languages l WHERE l.language_id = :langID")
    Languages findLanguageById(@Param("langID") int langID);

    @Query("SELECT l FROM Languages l WHERE l.language_name = :langName")
    Languages findLanguageByName(@Param("langName") String langName);

    @Modifying
    @Transactional
    @Query("DELETE FROM Languages l WHERE l.language_id = :langID")
    void deleteLanguageByID(@Param("langID") int langID);
    
}
