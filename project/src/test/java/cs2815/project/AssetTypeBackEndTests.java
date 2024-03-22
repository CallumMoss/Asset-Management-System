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

import cs2815.project.controller.AssetTypeController;
import cs2815.project.model.AssetType;
import cs2815.project.model.User;
import cs2815.project.repo.AssetTypeRepo;
import cs2815.project.service.Implementations.AssetTypeImpl;

// Tests are designed for the base database
@SpringBootTest
class AssetTypeBackEndTests {

    @Autowired
    private AssetTypeRepo atr;

    @Autowired
    private AssetTypeController atc;

    @Autowired
    private AssetTypeImpl atsi;

    //Testing working cases
    @Test
    void test1() {
        // Testing if we can get all asset types from the database.
        List<AssetType> asset_types = atsi.refreshAssetType();
    
        // Creating asset type objects and adding them to the array
        List<AssetType> expected_asset_types = new ArrayList<AssetType>();

        expected_asset_types.add(new AssetType(1, "Python File", "A file that contains python code for a given project.", "Python Version", null, null));
        expected_asset_types.add(new AssetType(2, "Documentation", "A file that contains documentation to supply extra information about any given asset.", "File Type", "Document Purpose", null));
        expected_asset_types.add(new AssetType(3, "Project", "A collection of assets which outline the integral parts of a project, such as code files, relevant documentation and participants.", "Product Owner", "Project Manager", "Status"));    

        // Compare the contents of the two lists
        for (int i = 0; i < 3; i++) {
            assert(asset_types.get(i).equals(expected_asset_types.get(i)));
        }
    }

    @Test
    void test2() {
        // Testing search
        List<AssetType> searched_asset_types;
        List<AssetType> expected_asset_types = new ArrayList<AssetType>();
        // Testing exact match for one
        searched_asset_types = atsi.searchTypes("Python File");
        expected_asset_types.add(new AssetType(1, "Python File", "A file that contains python code for a given project.", "Python Version", null, null));        assert(searched_asset_types.get(0).equals(expected_asset_types.get(0)));
        assert(searched_asset_types.get(0).equals(expected_asset_types.get(0)));

        // Testing similar match for one
        searched_asset_types = atsi.searchTypes("ython");        assert(searched_asset_types.get(0).equals(expected_asset_types.get(0)));
        expected_asset_types.clear();

        // Testing similar match for all
        searched_asset_types = atsi.searchTypes("e");
        expected_asset_types.add(new AssetType(1, "Python File", "A file that contains python code for a given project.", "Python Version", null, null));
        expected_asset_types.add(new AssetType(2, "Documentation", "A file that contains documentation to supply extra information about any given asset.", "File Type", "Document Purpose", null));
        expected_asset_types.add(new AssetType(3, "Project", "A collection of assets which outline the integral parts of a project, such as code files, relevant documentation and participants.", "Product Owner", "Project Manager", "Status"));  
        
        for (int i = 0; i < 3; i++) {
            assert(searched_asset_types.get(i).equals(expected_asset_types.get(i)));
        }
        expected_asset_types.clear();
    }

    // Testing incorrect cases (such as creating an asset type that already exists)
}
