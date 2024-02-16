package cs2815.project.service.Implementations;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import cs2815.project.model.Languages;
import cs2815.project.repo.LangRepo;
import cs2815.project.service.LanguageService;

@Service
public class LanguagesImpl implements LanguageService {

    @Autowired
    private LangRepo repo;

    @Override
    public List<Languages> refreshLanguages() {
        return repo.getLanguages();
    }

}
