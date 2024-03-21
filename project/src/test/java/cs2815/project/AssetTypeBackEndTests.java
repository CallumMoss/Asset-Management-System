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

        expected_asset_types.add(new AssetType());
        expected_asset_types.add(new AssetType());
        expected_asset_types.add(new AssetType());    

        // createAssetType(new AssetType("Python File", "A file that contains python code for a given project."), "Tom");
        // createAssetType(new AssetType("Documentation",
        //         "A file that contains documentation to supply extra information about any given asset."), "Tom");
        // createAssetType(new AssetType("Project",
        //         "A collection of assets which outline the integral parts of a project, such as code files, relevant documentation and participants."),
        //         "Tom");
        // createAssetType(new AssetType("Java File", "A file that contains java code for a given project."), "Tom");

        // Compare the contents of the two lists
        for (int i = 0; i < 4; i++) {
            assert(asset_types.get(i).equals(expected_asset_types.get(i)));
        }
    }
    // Testing incorrect cases (such as creating an asset type that already exists)
}
