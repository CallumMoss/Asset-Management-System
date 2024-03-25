package cs2815.project.service.Implementations;

import cs2815.project.model.Asset;
import cs2815.project.model.AssetDependency;
import cs2815.project.model.AssetType;
import cs2815.project.model.Log;
import cs2815.project.model.User;
import cs2815.project.model.specialmodels.AssetWrapper;
import cs2815.project.model.specialmodels.DependencyWrapper;
import cs2815.project.repo.*;
import cs2815.project.service.AssetService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.*;

@Service
public class AssetImpl implements AssetService {

    @Autowired
    private AssetRepo repo;

    @Autowired
    private AssetDependencyRepo assetDependencyRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ChatBoardRepo chatRepo;

    @Autowired
    private AssetTypeRepo assetTypeRepo;

    @Autowired
    private LogRepo logRepo;

    @Autowired
    private UserServiceImpl userService;

    @Override
    public void createAsset(AssetWrapper assetdto, String username) {

        Asset asset = convertWrapperToAsset(assetdto);

        repo.save(asset);

        Log log = new Log();
        log.setUpdateTimestamp(new Timestamp(System.currentTimeMillis()));
        log.setAsset(asset);
        log.setUser(userRepo.findByUserName(username));
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

        List<AssetDependency> dependencies = new ArrayList<>();

        for (DependencyWrapper dependencyWrapper : assetdto.getDependencies()) {

            asset.getAsset_id(); // current asset_idS

            Asset dependendingAsset = repo.getAssetByName(dependencyWrapper.getName()); // dependent asset_id
            String relation = dependencyWrapper.getRelationType();

            if (dependendingAsset != null) {

                AssetDependency dependency = new AssetDependency();
                dependency.setAsset(asset);
                dependency.setDependent(dependendingAsset);
                dependency.setRelationType(relation);

                dependencies.add(dependency);
            }
        }

        asset.setDependencies(dependencies);

        if (assetdto.getTypeAttributeValue1() != null) {
            asset.setTypeAttributeValue1(assetdto.getTypeAttributeValue1());
        }

        if (assetdto.getTypeAttributeValue2() != null) {
            asset.setTypeAttributeValue2(assetdto.getTypeAttributeValue2());
        }

        if (assetdto.getTypeAttributeValue3() != null) {
            asset.setTypeAttributeValue3(assetdto.getTypeAttributeValue3());
        }

        repo.save(asset);

    }

    // Finds what Assets are dependant on the given AssetID asse
    @Override
    public List<Asset> searchByAuthor(String searchString) {
        List<String> assetAuthors = userRepo.findAllUserNames();
        List<Asset> compatibleAssets = new ArrayList<>();
        List<User> compatibleAuthors;
        List<Asset> assets;
        for (String author : assetAuthors) {
            if (userService.isSimilar(searchString, author)) {
                compatibleAuthors = userRepo.getUserByUsername(author);
                for (User compAuth : compatibleAuthors) {
                    assets = repo.findAssetByAuthor(compAuth);
                    for (Asset asset : assets) {
                        if (!compatibleAssets.contains(asset)) {
                            compatibleAssets.add(asset);
                        }
                    }
                }
            }
        }
        return compatibleAssets;
    }

    @Override
    public List<Asset> searchByName(String searchString) {
        List<String> assetNames = repo.getAllNames();
        List<Asset> compatibleAssets = new ArrayList<>();
        List<Asset> assets;
        for (String name : assetNames) {
            if (userService.isSimilar(searchString, name)) {
                assets = repo.findAssetByTitle(name);
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
        List<Asset> assets;
        for (String type : assetTypes) {
            if (userService.isSimilar(searchString, type)) {
                assets = repo.findAssetByType(type);
                compatibleAssets.addAll(assets);
            }
        }
        return compatibleAssets;
    }

    public Asset convertWrapperToAsset(AssetWrapper assetDto) {
        Asset asset = new Asset();
        asset.setAsset_id(assetDto.getAsset_id());
        asset.setTitle(assetDto.getTitle());
        asset.setAsset_description(assetDto.getAsset_description());
        asset.setLink(assetDto.getLink());
        asset.setTypeAttributeValue1(assetDto.getTypeAttributeValue1());
        asset.setTypeAttributeValue2(assetDto.getTypeAttributeValue2());
        asset.setTypeAttributeValue3(assetDto.getTypeAttributeValue3());

        asset.setAsset_type(assetTypeRepo.findByTypeName(assetDto.getAsset_type()));
        asset.getAsset_type().getType_name();
        asset.setUpdateTimestamp(new Timestamp(System.currentTimeMillis()));

        return asset;
    }

    @Override
    public List<Asset> refresh() {
        return repo.getAllAssets();
    }

    @Override
    public Asset getNewestAsset() {
        return repo.findNewestAsset();
    }

    @Override
    public Asset getAssetById(int AssetId) {
        return repo.findAssetById(AssetId);

    }

    @Override
    public void deleteAsset(int assetID, String username) {

        Log log = new Log();
        log.setUpdateTimestamp(new Timestamp(System.currentTimeMillis()));
        log.setUser(userRepo.findByUserName(username));
        log.setUpdateDescription(repo.findAssetById(assetID).getTitle() + " was deleted!");

        logRepo.save(log);

        logRepo.eraseAssetIdFromLogs(assetID);

        assetDependencyRepo.deleteAssetbyID(assetID);

        chatRepo.deleteMessagebyAssetID(assetID);

        repo.deleteAssetbyID(assetID);
    }

    @Override
    public void editAsset(AssetWrapper assetDto, String username) {

        Asset asset = convertWrapperToAsset(assetDto);

        List<User> authors = new ArrayList<>();

        for (String author : assetDto.getAuthors()) {
            User user = userRepo.findByUserName(author);
            if (user != null) {
                authors.add(user);
            }
        }
        asset.setAuthors(authors);

        assetDependencyRepo.deleteAssetbyParentID(asset.getAsset_id());

        List<AssetDependency> dependencies = new ArrayList<>();

        for (DependencyWrapper dependencyWrapper : assetDto.getDependencies()) {

            asset.getAsset_id(); // current asset_id

            Asset dependingAsset = repo.getAssetByName(dependencyWrapper.getName()); // dependent asset_id
            String relation = dependencyWrapper.getRelationType();

            if (dependingAsset != null) {

                AssetDependency dependency = new AssetDependency();
                dependency.setAsset(asset);
                dependency.setDependent(dependingAsset);
                dependency.setRelationType(relation);

                if (dependency != null) {

                    dependencies.add(dependency);
                }

            }
        }

        asset.setDependencies(dependencies);

        Log log = new Log();
        log.setUpdateTimestamp(new Timestamp(System.currentTimeMillis()));
        log.setUser(userRepo.findByUserName(username));
        log.setAsset(asset);
        log.setUpdateDescription(
                asset.getTitle() + " asset was edited! Modifications are the following:\n" +
                        "Name: " + asset.getTitle() + "\n" +
                        "Description: " + asset.getAsset_description() + "\n" +
                        "Link: " + asset.getLink() + "\n" +
                        "Attribute1: " + asset.getTypeAttributeValue1() + "\n" +
                        "Attribute2: " + asset.getTypeAttributeValue2() + "\n" +
                        "Attribute3: " + asset.getTypeAttributeValue3());

        logRepo.save(log);

        repo.save(asset);
    }

    public void createBaseAssets() {
        List<String> authors = Arrays.asList("BaseAdmin");
        DependencyWrapper dwrapper = new DependencyWrapper();
        List<DependencyWrapper> dwrapper_list = new ArrayList<DependencyWrapper>();
        dwrapper_list.add(dwrapper);
        AssetWrapper wrapper = new AssetWrapper(1, "Piece.py",
                "A python program that contains a class which describes the attributes and functions of a chess piece.",
                "website.com/piece.py", "Python File", authors, dwrapper_list, "3.9.10", null, null);
        createAsset(wrapper, "BaseUser");
        //
        authors = Arrays.asList("BaseViewer");
        dwrapper = new DependencyWrapper();
        dwrapper_list.clear();
        dwrapper_list.add(dwrapper);
        wrapper = new AssetWrapper(2, "Heroes Rising", "2D Game developed as part of the first year games module.",
                "some_link.com", "Project", authors, dwrapper_list, "Callum and Satwik", "DongGyun", "Complete");
        createAsset(wrapper, "BaseAdmin");

        authors = Arrays.asList("BaseUser", "BaseViewer");
        dwrapper = new DependencyWrapper("Heroes Rising", "Documentation of");
        dwrapper_list.clear();
        dwrapper_list.add(dwrapper);
        wrapper = new AssetWrapper(3, "README", "Read me file for the project Heroes Rising.", "random/readme.md",
                "Documentation", authors, dwrapper_list, ".MD", "Outlines details relevant for product use", null);
        createAsset(wrapper, "BasAdmin");
    }

    @Override
    public List<Asset> sort(List<Asset> unsortedAssets, String orderBy) {
        List<String> sortByList = new ArrayList<String>();
        List<Asset> sortedAssets = new ArrayList<>();
        List<Asset> allAssets = searchByName("");

        List<Integer> unsortedAssetIds = new ArrayList<Integer>();
        for (Asset asset : unsortedAssets) {
            sortByList.add(asset.getTitle().toLowerCase());
            unsortedAssetIds.add(asset.getAsset_id());
        }
        switch (orderBy) {
            case "Oldest":
                for (Asset asset : allAssets) {
                    if (unsortedAssetIds.contains(asset.getAsset_id())) {
                        sortedAssets.add(asset);
                    }
                }
                break;
            case "Newest":
                for (Asset asset : allAssets) {
                    if (unsortedAssetIds.contains(asset.getAsset_id())) {
                        sortedAssets.add(asset);
                    }
                }
                Collections.reverse((sortedAssets));
                break;
            default:
                sortedAssets = unsortedAssets;
                String temp;
                Asset tempBis;
                int size = sortByList.size();
                for (int i = 0; i < size; i++) {
                    for (int j = i + 1; j < size; j++) {
                        if (sortByList.get(i).toLowerCase().compareTo(sortByList.get(j).toLowerCase()) > 0) {
                            temp = sortByList.get(i);
                            tempBis = sortedAssets.get(i);
                            sortByList.set(i, sortByList.get(j));
                            sortedAssets.set(i, sortedAssets.get(j));
                            sortByList.set(j, temp);
                            sortedAssets.set(j, tempBis);
                        }
                    }
                }
        }
        return sortedAssets;
    }

    @Override
    public List<AbstractMap.SimpleEntry<String, List<AbstractMap.SimpleEntry<String, List<String>>>>> getAssetsAndAttributes() {
        List<AssetType> assetTypeList = assetTypeRepo.getAllAssetTypes();
        List<AbstractMap.SimpleEntry<String, List<AbstractMap.SimpleEntry<String, List<String>>>>> assetsAndAttributesByType = new ArrayList<>();

        for (AssetType assetType : assetTypeList) {
            List<Asset> typeAssets = repo.findAssetByType(assetType.getType_name());
            List<AbstractMap.SimpleEntry<String, List<String>>> assetsAndAttributes = new ArrayList<>();

            for (Asset asset : typeAssets) {

                List<String> assetAttributes = repo.getAssetAttributes(asset.getAsset_id());
                assetsAndAttributes.add(new AbstractMap.SimpleEntry<>(asset.getTitle(), assetAttributes));

            }

            assetsAndAttributesByType.add(new AbstractMap.SimpleEntry<>(assetType.getType_name(), assetsAndAttributes));
        }

        return assetsAndAttributesByType;
    }
}