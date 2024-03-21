package cs2815.project;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Assertions;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import cs2815.project.controller.AssetController;
import cs2815.project.model.Asset;
import cs2815.project.model.specialmodels.AssetWrapper;
import cs2815.project.model.specialmodels.DependencyWrapper;
import cs2815.project.repo.AssetRepo;
import cs2815.project.service.Implementations.AssetImpl;

// Tests are designed for the base database
@SpringBootTest
class AssetBackEndTests {

    @Autowired
    private AssetRepo ar;

    @Autowired
    private AssetController ac;

    @Autowired
    private AssetImpl ai;

    // Testing working cases
    @Test
    void test1() {
        // Testing if we can get all assets from the database.
        List<Asset> assets = ai.refresh();
    
        // Creating Asset objects and adding them to the array
        List<Asset> expected_assets = new ArrayList<Asset>();
        expected_assets.add(new Asset());
        expected_assets.add(new Asset());
        expected_assets.add(new Asset());
        
        // List<String> authors = Arrays.asList("BaseAdmin");
        // DependencyWrapper dwrapper = new DependencyWrapper();
        // List<DependencyWrapper> dwrapper_list = new ArrayList<DependencyWrapper>();
        // dwrapper_list.add(dwrapper);
        // List<String> languages = Arrays.asList("Java");
        // AssetWrapper wrapper = new AssetWrapper("Piece.py",
        //         "A python program that contains a class which describes the attributes and functions of a chess piece.",
        //         "website.com/piece.py", "Python File", authors, dwrapper_list, languages);
        // createAsset(wrapper, "Tom");
        // //
        // authors = Arrays.asList("BaseViewer");
        // dwrapper = new DependencyWrapper();
        // dwrapper_list.clear();
        // dwrapper_list.add(dwrapper);
        // languages = Arrays.asList("Python", "Java");
        // wrapper = new AssetWrapper("Heroes Rising", "2D Game developed as part of the first year games module.",
        //         "some_link.com", "Project", authors, dwrapper_list, languages);
        // createAsset(wrapper, "Tom");

        // authors = Arrays.asList("BaseUser", "BaseViewer");
        // dwrapper = new DependencyWrapper("Heroes Rising", "Documentation of");
        // dwrapper_list.clear();
        // dwrapper_list.add(dwrapper);
        // languages = Arrays.asList();
        // wrapper = new AssetWrapper("README", "Read me file for the project Heroes Rising.", "random/readme.md",
        //         "Documentation", authors, dwrapper_list, languages);
        // createAsset(wrapper, "Tom");

        // Compare the contents of the two lists
        for (int i = 0; i < 3; i++) {
            assert(assets.get(i).equals(expected_assets.get(i)));
        }
    }
    // Testing incorrect cases (such as creating an asset that already exists)
}
