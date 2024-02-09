package cs2815.project.service.Implementations;

import cs2815.project.model.Asset;
import cs2815.project.model.User;
import cs2815.project.model.specialmodels.AssetWrapper;
import cs2815.project.repo.AssetRepo;
import cs2815.project.repo.AssetTypeRepo;
import cs2815.project.repo.UserRepo;
import cs2815.project.service.AssetService;
import jakarta.transaction.Transactional;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AssetImpl implements AssetService {

    @Autowired
    private AssetRepo repo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private AssetTypeRepo assetTypeRepo;

    @Autowired
    private UserServiceImpl userService;

    public static HashMap<String, Integer> languageIDMap = Asset.languageIDMap;

    @Transactional
    public void createAsset(AssetWrapper assetdto) {
        Asset asset = convertWrapperToAsset(assetdto);

        repo.save(asset);

        List<User> authors = new ArrayList<>();

        for (String author : assetdto.getAuthors()) {
            User user = userRepo.findByUserName(author);
            if (user != null) {
                authors.add(user);
            }
        }

        asset.setAuthors(authors);

        List<Asset> dependents = new ArrayList<>();

        for (String title : assetdto.getDependencies()) {
            Asset tempAsset = repo.findAssetByTitle(title);
            if (tempAsset != null) {
                dependents.add(tempAsset);
            }
        }

        asset.setDependent(dependents);

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

    public Asset convertWrapperToAsset(AssetWrapper assetDto) {
        Asset asset = new Asset();
        asset.setTitle(assetDto.getTitle());
        asset.setAsset_description(assetDto.getAsset_description());
        asset.setLink(assetDto.getLink());
        asset.setLangList(assetDto.getLangList());

        asset.setAsset_type(assetTypeRepo.findByTypeName(assetDto.getAsset_type()));

        asset.setUpdateTimestamp(new Timestamp(System.currentTimeMillis()));

        return asset;
    }
}
