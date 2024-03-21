package cs2815.project.controller;

/*
 * Java imports:
 */
import java.util.List;

/*
 * Springboot imports:
 */
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/*
 * Imports for project:
 */
import cs2815.project.model.Languages;
import cs2815.project.service.LanguageService;

/**
 * Class different uses actions involving languages.
 */
@RestController
@RequestMapping("/languages")
public class LanguageController {

    //Private fields:
    @Autowired
    private LanguageService languageService;

    /**
     * Function to respond to use of refresh button.
     */
    @GetMapping("/refresh")
    public ResponseEntity<List<Languages>> refreshLanguages() {
        List<Languages> languages = languageService.refreshLanguages();
        return ResponseEntity.ok(languages);

    }
}