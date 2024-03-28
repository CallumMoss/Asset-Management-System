package cs2815.project;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import cs2815.project.model.Asset;
import cs2815.project.model.specialmodels.AssetWrapper;
import cs2815.project.model.specialmodels.DependencyWrapper;
import cs2815.project.service.Implementations.AssetImpl;

// Tests are designed for the base database
// Ensure to have a clear database, then login to the website.
// By logging in with an empty database, the base database is created for you.
// Tests will only run for base database.
@SpringBootTest
class AssetBackEndTests {

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
    }

    @Test
    void test3() {
        // Testing filter search (by type)
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
        searched_assets = ai.searchByType("Python File");
        expected_assets.add(asset1);
        assert(searched_assets.get(0).equals(expected_assets.get(0)));

        // Testing similar match for one
        searched_assets = ai.searchByType("ytho");
        assert(searched_assets.get(0).equals(expected_assets.get(0)));
        expected_assets.clear();

        // Testing similar match for all
        searched_assets = ai.searchByType("e");
        expected_assets.add(asset1);
        expected_assets.add(asset3); // different order because documentation is created before project asset type, so is displayed in this order
        expected_assets.add(asset2);

        for (int i = 0; i < 3; i++) {
            assert(searched_assets.get(i).equals(expected_assets.get(i)));
        }
    }

    @Test
    void test4() {
        // Testing filter search (by author)
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
        searched_assets = ai.searchByAuthor("BaseAdmin");
        expected_assets.add(asset1);
        assert(searched_assets.get(0).equals(expected_assets.get(0)));

        // Testing similar match for one
        searched_assets = ai.searchByAuthor("admi");
        assert(searched_assets.get(0).equals(expected_assets.get(0)));
        expected_assets.clear();

        // Testing similar match for all
        searched_assets = ai.searchByAuthor("Base");
        expected_assets.add(asset2);
        expected_assets.add(asset3); // different order because documentation is created before project asset type, so is displayed in this order
        expected_assets.add(asset1);

        for (int i = 0; i < 3; i++) {
            assert(searched_assets.get(i).equals(expected_assets.get(i)));
        }
        expected_assets.clear();

        // Testing for multiple authors
        // BaseViewer and BaseUser
        List<Asset> searched_assets1 = ai.searchByAuthor("BaseViewer");
        List<Asset> searched_assets2 = ai.searchByAuthor("BaseUser");

        expected_assets.add(asset2);
        expected_assets.add(asset3);

        assert(searched_assets1.get(0).equals(expected_assets.get(0)));
        assert(searched_assets2.get(0).equals(expected_assets.get(1)));
        assert(searched_assets1.get(1).equals(expected_assets.get(1)));
    }

    @Test
    void test5() {
        // Testing alphabetical sort
        List<Asset> sorted_assets;

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

        sorted_assets = ai.sort(ai.refresh(), "");
        
        expected_assets.add(asset2);
        expected_assets.add(asset1);
        expected_assets.add(asset3);

        for (int i = 0; i < 3; i++) {
            assert(sorted_assets.get(i).equals(expected_assets.get(i)));
        }
    }

    @Test
    void test6() {
        // Testing chronological sort (oldest first)
        List<Asset> sorted_assets;

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

        sorted_assets = ai.sort(ai.refresh(), "Oldest");
        
        expected_assets.add(asset1);
        expected_assets.add(asset2);
        expected_assets.add(asset3);

        for (int i = 0; i < 3; i++) {
            assert(sorted_assets.get(i).equals(expected_assets.get(i)));
        }
    }

    @Test
    void test7() {
        // Testing chronological sort (newest first)
        List<Asset> sorted_assets;

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

        sorted_assets = ai.sort(ai.refresh(), "Newest");
        
        expected_assets.add(asset3);
        expected_assets.add(asset2);
        expected_assets.add(asset1);

        for (int i = 0; i < 3; i++) {
            assert(sorted_assets.get(i).equals(expected_assets.get(i)));
        }
    }

    @Test
    void test8() {
        // Testing creation and deletion of assets
        // Testing creation
       List<String> authors = Arrays.asList("BaseAdmin");
       DependencyWrapper dwrapper = new DependencyWrapper();
       List<DependencyWrapper> dwrapper_list = new ArrayList<DependencyWrapper>();
       dwrapper_list.add(dwrapper);
       AssetWrapper wrapper = new AssetWrapper(4, "TempAsset",
               "Temp Description",
               "templink.com", "Python File", authors, dwrapper_list, "3.9.10", null, null);
       ai.createAsset(wrapper, "BaseUser");
       List<Asset> actual_asset = ai.searchByName("TempAsset");
       wrapper.setAsset_id(actual_asset.get(0).getAsset_id());
       assertEquals(actual_asset.get(0), ai.convertWrapperToAsset(wrapper));

       // Testing deletion
       ai.deleteAsset(actual_asset.get(0).getAsset_id(), "BaseAdmin");
       assertEquals(ai.searchByName("TempAsset"), new ArrayList<Asset>());
    }

    @Test
    void test9() {
        // Testing edit

        List<String> authors = Arrays.asList("BaseAdmin");
       DependencyWrapper dwrapper = new DependencyWrapper();
       List<DependencyWrapper> dwrapper_list = new ArrayList<DependencyWrapper>();
       dwrapper_list.add(dwrapper);
       AssetWrapper wrapper = new AssetWrapper(4, "TempAsset",
               "Temp Description",
               "templink.com", "Python File", authors, dwrapper_list, "3.9.10", null, null);
       ai.createAsset(wrapper, "BaseUser");
       List<Asset> actual_asset = ai.searchByName("TempAsset");
       wrapper.setAsset_id(actual_asset.get(0).getAsset_id());

       authors = Arrays.asList("BaseAdmin");
       dwrapper = new DependencyWrapper();
       dwrapper_list = new ArrayList<DependencyWrapper>();
       dwrapper_list.add(dwrapper);
       AssetWrapper newWrapper = new AssetWrapper(wrapper.getAsset_id(), "NewTempAsset",
               "New Temp Description",
               "newtemplink.com", "Python File", authors, dwrapper_list, "3.8", null, null);
        ai.editAsset(newWrapper, "BaseAdmin");
        actual_asset = ai.searchByName("TempAsset");



        for (int i = 0; i < actual_asset.size(); i++) {
                // if old TempAssetType exists, this would fail. If it doesnt and is replaced by new, it passes.
                assertEquals(actual_asset.get(0), ai.convertWrapperToAsset(newWrapper));
            }

        ai.deleteAsset(actual_asset.get(0).getAsset_id(), "BaseAdmin");
        assertEquals(ai.searchByName("TempAsset"), new ArrayList<Asset>());
    }
}
