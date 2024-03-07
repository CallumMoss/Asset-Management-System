package cs2815.project.service.Implementations;

import cs2815.project.model.Asset;
import cs2815.project.model.Languages;
import cs2815.project.model.Log;
import cs2815.project.model.User;
import cs2815.project.model.specialmodels.AssetWrapper;
import cs2815.project.repo.*;
import cs2815.project.service.AssetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class AssetImpl implements AssetService {

    @Autowired
    private AssetRepo repo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private AssetTypeRepo assetTypeRepo;

    @Autowired
    private LogRepo logRepo;

    @Autowired
    private LangRepo langRepo;

    @Autowired
    private UserServiceImpl userService;

    @Override
    public void createAsset(AssetWrapper assetdto) {

        Asset asset = convertWrapperToAsset(assetdto);

        repo.save(asset);

        Log log = new Log();
        log.setUpdateTimestamp(new Timestamp(System.currentTimeMillis()));
        log.setAsset(asset);
        log.setUpdateDescription(asset.getTitle() + " was created!");

        logRepo.save(log);

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
            List<Asset> tempAsset = repo.findAssetByTitle(title);
            if (tempAsset.get(0) != null) {
                dependents.add(tempAsset.get(0));
            }
        }
        asset.setDependent(dependents);

        List<Languages> languages = new ArrayList<>();

        for (String language : assetdto.getLanguages()) {
            Languages tempLang = langRepo.findLanguageByName(language);
            if (tempLang != null) {
                languages.add(tempLang);
            }
        }

        asset.setLanguages(languages);

        repo.save(asset);

    }

    @Override
    public List<String> searchLanguage(String searchString) {
        List<String> LanguagesList = langRepo.getAllLanguageNames();
        List<String> compatibleList = new ArrayList<>();
        for (String language : LanguagesList) {
            if (searchString.equals(language) || userService.isSimilar(searchString, language)) {
                compatibleList.add(language);
            }
        }
        return compatibleList;
    }

    //Finds what Assets are dependant on the given AssetID asset
    @Override
    public List<Integer> isDependantOn(int assetId) {
        return repo.isDependantOn(assetId);
    }

    //Finds the Assets that the given AssetID depends On
    @Override
    public List<Integer> isParentOf(int assetId) {
        return repo.isParentOf(assetId);
    }

    @Override
    public List<Asset> searchByAuthor(String searchString) {
        List<String> assetAuthors = userRepo.findAllUserNames();
        List<Asset> compatibleAssets = new ArrayList<>();
        for (String author : assetAuthors) {
            if (searchString.equals(author) || userService.isSimilar(searchString, author)) {
                List<Asset> assets = repo.findAssetByAuthor(userRepo.getUserByUsername(author).get(0));
                if (!compatibleAssets.contains(assets.get(0))) {
                    compatibleAssets.addAll(assets);
                }
            }
        }
        return compatibleAssets;
    }

    @Override
    public List<Asset> searchByName(String searchString) {
        List<String> assetNames = repo.getAllNames();
        List<Asset> compatibleAssets = new ArrayList<>();
        for (String name : assetNames) {
            if (searchString.equals(name) || userService.isSimilar(searchString, name)) {
                List<Asset> assets = repo.findAssetByTitle(name);
                if (!compatibleAssets.contains(assets.get(0))) {
                    compatibleAssets.addAll(assets);
                }
            }
        }
        return compatibleAssets;
    }

    @Override
    public List<Asset> searchByType(String searchString) {
        List<String> assetTypes = repo.getAllTypes();
        List<Asset> compatibleAssets = new ArrayList<>();
        for (String type : assetTypes) {
            if (searchString.equals(type) || userService.isSimilar(searchString, type)) {
                List<Asset> assets = repo.findAssetByType(type);
                compatibleAssets.addAll(assets);
            }
        }
        return compatibleAssets;
    }


    public Asset convertWrapperToAsset(AssetWrapper assetDto) {
        Asset asset = new Asset();
        asset.setTitle(assetDto.getTitle());
        asset.setAsset_description(assetDto.getAsset_description());
        asset.setLink(assetDto.getLink());

        asset.setAsset_type(assetTypeRepo.findByTypeName(assetDto.getAsset_type()));

        asset.setUpdateTimestamp(new Timestamp(System.currentTimeMillis()));

        return asset;
    }

    @Override
    public List<Asset> refresh() {
        return repo.getAllAssets();
    }

    @Override
    public void deleteAsset(int assetID) {

        Log log = new Log();
        log.setUpdateTimestamp(new Timestamp(System.currentTimeMillis()));
        log.setUpdateDescription(repo.findAssetById(assetID).getTitle() + " was deleted!");

        logRepo.save(log);

        logRepo.eraseAssetIdFromLogs(assetID);
        repo.eraseUserIdFromDependency(assetID);

        repo.deleteAssetbyID(assetID);
    }

    @Override
    public void createBaseAssets() {
        
        List<String> authors = Arrays.asList("BaseAdmin");
        List<String> dependencies = Arrays.asList();
        List<String> languages = Arrays.asList("Java");
        AssetWrapper wrapper = new AssetWrapper(
            "Piece.py", // title
            "A python program that contains a class which describes the attributes and functions of a chess piece.", // asset_description
            "website.com/piece.py", // link
            "Python File", // asset_type
            authors, // authors
            dependencies, // dependencies
            languages // languages
        );
        createAsset(wrapper);
        //
        authors = Arrays.asList("BaseViewer");
        dependencies = Arrays.asList();
        languages = Arrays.asList("Python", "Java");
        wrapper = new AssetWrapper(
            "Heroes Rising", // title
            "2D Game developed as part of the first year games module.", // asset_description
            "some_link.com", // link
            "Project", // asset_type
            authors, // authors
            dependencies, // dependencies
            languages // languages
        );
        createAsset(wrapper);

        authors = Arrays.asList("BaseUser", "BaseViewer");
        dependencies = Arrays.asList("Heroes Rising");
        languages = Arrays.asList();
        wrapper = new AssetWrapper(
            "README", // title
            "Read me file for the project Heroes Rising.", // asset_description
            "random/readme.md", // link
            "Documentation", // asset_type
            authors, // authors
            dependencies, // dependencies
            languages // languages
        );
        createAsset(wrapper);
        
    }
}
