package cs2815.project.service.Implementations;

import cs2815.project.model.Asset;
import cs2815.project.repo.AssetRepo;
import cs2815.project.service.AssetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
public class AssetImpl implements AssetService {

    @Autowired
    private AssetRepo repo;

    @Autowired
    private UserServiceImpl userService;

    public static HashMap<String, Integer> languageIDMap = Asset.languageIDMap;

    @Override
    public void createAsset(Asset asset) {
        if (asset == null) {
            System.out.println("Error: Asset is null.");
            return;
        }
        if (asset.getLangList() != null) {
            String[] langList = asset.getLangList().split("/");
            for (int i = 0; i < langList.length; i++) {
                if (i >= 5) {
                    break;
                }
                Integer languageID = languageIDMap.get(langList[i]);
                if (languageID != null) {
                    asset.addLanguageID(languageID);
                } else {
                    System.out.println("Error: Language ID not found for " + langList[i]);
                }
            }
        }
        repo.save(asset);
    }

    @Override
    public List<Asset> searchAsset(String searchString) {
        List<Asset> assetList = repo.getAllAssets();
        List<Integer> compatibleLangIDs = new ArrayList<>();
        List<Asset> compatibleList = new ArrayList<>();
        for (String language : languageIDMap.keySet()) {
            userService.isSimilar(searchString, language);
            if (userService.isSimilar(searchString, language)) {
                compatibleLangIDs.add(languageIDMap.get(language));
            }
        }
        for (Asset asset : assetList) {
            if (asset.isSearched(compatibleLangIDs)) {
                compatibleList.add(asset);
            }
        }
        return compatibleList;
    }

    @Override
    public List<String> searchLanguage(String searchString) {
        List<String> compatibleList = new ArrayList<>();
        for (String language : languageIDMap.keySet()) {
            userService.isSimilar(searchString, language);
            if (userService.isSimilar(searchString, language)) {
                compatibleList.add(language);
            }
        }
        return compatibleList;
    }
}
