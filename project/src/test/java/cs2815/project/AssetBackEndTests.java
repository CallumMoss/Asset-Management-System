package cs2815.project;

import java.util.ArrayList;
import java.util.Arrays;
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
import cs2815.project.model.AssetType;
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
        
        List<String> authors = Arrays.asList("BaseAdmin");
        DependencyWrapper dwrapper = new DependencyWrapper();
        List<DependencyWrapper> dwrapper_list = new ArrayList<DependencyWrapper>();
        dwrapper_list.add(dwrapper);
        AssetWrapper wrapper1 = new AssetWrapper(1, "Piece.py",
                "A python program that contains a class which describes the attributes and functions of a chess piece.",
                "website.com/piece.py", "Python File", authors, dwrapper_list, "3.9.10", null, null);
        Asset asset1 = ai.convertWrapperToAsset(wrapper1);

        authors = Arrays.asList("BaseViewer");
        dwrapper = new DependencyWrapper();
        dwrapper_list.clear();
        dwrapper_list.add(dwrapper);
        AssetWrapper wrapper2 = new AssetWrapper(2, "Heroes Rising", "2D Game developed as part of the first year games module.",
                "some_link.com", "Project", authors, dwrapper_list, "Callum and Satwik", "DongGyun", "Complete");
        Asset asset2 = ai.convertWrapperToAsset(wrapper2);

        authors = Arrays.asList("BaseUser", "BaseViewer");
        dwrapper = new DependencyWrapper("Heroes Rising", "Documentation of");
        dwrapper_list.clear();
        dwrapper_list.add(dwrapper);
        AssetWrapper wrapper3 = new AssetWrapper(3, "README", "Read me file for the project Heroes Rising.", "random/readme.md",
                "Documentation", authors, dwrapper_list, ".MD", "Outlines details relevant for product use", null);
        Asset asset3 = ai.convertWrapperToAsset(wrapper3);

        expected_assets.add(asset1);
        expected_assets.add(asset2);
        expected_assets.add(asset3);

        // Compare the contents of the two lists
        for (int i = 0; i < 3; i++) {
            assert(assets.get(i).equals(expected_assets.get(i)));
        }
    }

        @Test
    void test2() {
        // Testing default search (by name)
        List<Asset> searched_assets;

        List<Asset> expected_assets = new ArrayList<Asset>();
        
        List<String> authors = Arrays.asList("BaseAdmin");
        DependencyWrapper dwrapper = new DependencyWrapper();
        List<DependencyWrapper> dwrapper_list = new ArrayList<DependencyWrapper>();
        dwrapper_list.add(dwrapper);
        AssetWrapper wrapper1 = new AssetWrapper(1, "Piece.py",
                "A python program that contains a class which describes the attributes and functions of a chess piece.",
                "website.com/piece.py", "Python File", authors, dwrapper_list, "3.9.10", null, null);
        Asset asset1 = ai.convertWrapperToAsset(wrapper1);

        authors = Arrays.asList("BaseViewer");
        dwrapper = new DependencyWrapper();
        dwrapper_list.clear();
        dwrapper_list.add(dwrapper);
        AssetWrapper wrapper2 = new AssetWrapper(2, "Heroes Rising", "2D Game developed as part of the first year games module.",
                "some_link.com", "Project", authors, dwrapper_list, "Callum and Satwik", "DongGyun", "Complete");
        Asset asset2 = ai.convertWrapperToAsset(wrapper2);

        authors = Arrays.asList("BaseUser", "BaseViewer");
        dwrapper = new DependencyWrapper("Heroes Rising", "Documentation of");
        dwrapper_list.clear();
        dwrapper_list.add(dwrapper);
        AssetWrapper wrapper3 = new AssetWrapper(3, "README", "Read me file for the project Heroes Rising.", "random/readme.md",
                "Documentation", authors, dwrapper_list, ".MD", "Outlines details relevant for product use", null);
        Asset asset3 = ai.convertWrapperToAsset(wrapper3);



        // Testing exact match for one
        searched_assets = ai.searchByName("Piece.py");
        expected_assets.add(asset1);
        assert(searched_assets.get(0).equals(expected_assets.get(0)));

        // Testing similar match for one
        searched_assets = ai.searchByName(".p");
        assert(searched_assets.get(0).equals(expected_assets.get(0)));
        expected_assets.clear();

        // Testing similar match for all
        searched_assets = ai.searchByName("e");
        expected_assets.add(asset1);
        expected_assets.add(asset2);
        expected_assets.add(asset3);

        for (int i = 0; i < 3; i++) {
            assert(searched_assets.get(i).equals(expected_assets.get(i)));
        }
        expected_assets.clear();
    }

    // Testing incorrect cases (such as creating an asset that already exists)
}
