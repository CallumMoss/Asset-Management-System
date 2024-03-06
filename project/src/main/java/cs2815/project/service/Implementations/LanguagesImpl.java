package cs2815.project.service.Implementations;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import cs2815.project.model.Languages;
import cs2815.project.model.User;
import cs2815.project.repo.LangRepo;
import cs2815.project.service.LanguageService;

@Service
public class LanguagesImpl implements LanguageService {

    @Autowired
    private LangRepo repo;

    @Override
    public void createBaseLanguages() {

        String[] languages = {
            "Java", "Python", "C", "C++", "JavaScript", "C#", "PHP", "Swift", "Objective-C", "TypeScript",
            "Ruby", "Go", "Rust", "Kotlin", "Perl", "Scala", "HTML", "CSS", "SQL", "Shell", "Assembly",
            "R", "Dart", "Haskell", "Lua", "Julia", "MATLAB", "Groovy", "Clojure", "VBScript", "Pascal",
            "Fortran", "Ada", "Lisp", "Scheme", "Prolog", "Erlang", "D", "Dylan", "Smalltalk", "Tcl", "Elixir",
            "Racket", "COBOL", "F#", "PowerShell", "Bash", "Objective-J", "Delphi", "LabVIEW", "Scratch", "PL/SQL"
        };
        
        for(String language : languages) {
            if(repo.findLanguageByName(language) == null) {
                Languages newLanguage = new Languages(language);
                repo.save(newLanguage);
            }
        }
    }

    @Override
    public List<Languages> refreshLanguages() {
        return repo.getLanguages();
    }

}
