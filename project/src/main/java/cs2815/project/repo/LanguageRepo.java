package cs2815.project.repo;

import cs2815.project.model.Language;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LanguageRepo extends JpaRepository<Language, Integer> {

}
