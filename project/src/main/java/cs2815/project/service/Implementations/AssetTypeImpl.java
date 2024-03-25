package cs2815.project.service.Implementations;

import cs2815.project.model.Asset;
import cs2815.project.model.AssetType;
import cs2815.project.model.Log;
import cs2815.project.repo.AssetRepo;
import cs2815.project.repo.AssetTypeRepo;
import cs2815.project.repo.LogRepo;
import cs2815.project.repo.UserRepo;
import cs2815.project.service.AssetTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.AbstractMap;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class AssetTypeImpl implements AssetTypeService {

    @Autowired
    private AssetTypeRepo repo;

    @Autowired
    private LogRepo logrepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private AssetRepo assetrepo;

    @Autowired
    private UserServiceImpl userService;

    @Override
    public void createAssetType(AssetType assetType, String username) {
        repo.save(assetType);

        Log log = new Log();
        log.setUpdateTimestamp(new Timestamp(System.currentTimeMillis()));
        log.setUser(userRepo.findByUserName(username));
        log.setUpdateDescription(assetType.getType_name() + " was created!");

        logrepo.save(log);

    }

    @Override
    public void createBaseTypes() {
        createAssetType(new AssetType(1, "Python File", "A file that contains python code for a given project.",
                "Python Version", null, null), "BaseAdmin");

        createAssetType(new AssetType(2, "Documentation",
                "A file that contains documentation to supply extra information about any given asset.", "File Type",
                "Document Purpose", null), "BaseUser");
        createAssetType(new AssetType(3, "Project",
                "A collection of assets which outline the integral parts of a project, such as code files, relevant documentation and participants.",
                "Product Owner", "Project Manager", "Status"),
                "BaseAdmin");
    }

    @Override
    public List<AbstractMap.SimpleEntry<String, List<String>>> getTypesAndAttributes() {

        List<AssetType> assetTypeList = repo.getAllAssetTypes();
        List<AbstractMap.SimpleEntry<String, List<String>>> typeAndAttributes = new ArrayList<>();

        for (AssetType assetType : assetTypeList) {
            List<Object[]> typeAttributes = repo.getAttributesById(assetType.getType_id());
            List<String> attributes = new ArrayList<>();
            for (Object[] rawAttribute : typeAttributes) {
                // Assuming all attributes are strings. Add null checks if necessary.
                if (rawAttribute[0] != null) attributes.add((String) rawAttribute[0]);
                if (rawAttribute[1] != null) attributes.add((String) rawAttribute[1]);
                if (rawAttribute[2] != null) attributes.add((String) rawAttribute[2]);
                typeAndAttributes.add(new AbstractMap.SimpleEntry<>(assetType.getType_name(), attributes));
            }
        }

        return typeAndAttributes;
    }

    @Override
    public List<AssetType> sort(List<AssetType> unsortedAssetTypes, String orderBy) {
        List<String> sortByList = new ArrayList<>();
        List<AssetType> sortedAssetTypes = new ArrayList<>();
        List<AssetType> allAssetTypes = searchTypes("");

        List<Integer> unsortedAssetTypeIds = new ArrayList<Integer>();
        for (AssetType assetType : unsortedAssetTypes) {
            sortByList.add(assetType.getType_name().toLowerCase());
            unsortedAssetTypeIds.add(assetType.getType_id());
        }
        switch (orderBy) {
            case "Oldest":
                for (AssetType assetType : allAssetTypes) {
                    if (unsortedAssetTypeIds.contains(assetType.getType_id())) {
                        sortedAssetTypes.add(assetType);
                    }
                }
                break;
            case "Newest":
                for (AssetType assetType : allAssetTypes) {
                    if (unsortedAssetTypeIds.contains(assetType.getType_id())) {
                        sortedAssetTypes.add(assetType);
                    }
                }
                Collections.reverse((sortedAssetTypes));
                break;
            default:
                sortedAssetTypes = unsortedAssetTypes;
                String temp;
                AssetType tempBis;
                int size = sortByList.size();
                for (int i = 0; i < size; i++) {
                    for (int j = i + 1; j < size; j++) {
                        if (sortByList.get(i).compareTo(sortByList.get(j)) > 0) {
                            temp = sortByList.get(i);
                            tempBis = sortedAssetTypes.get(i);
                            sortByList.set(i, sortByList.get(j));
                            sortedAssetTypes.set(i, sortedAssetTypes.get(j));
                            sortByList.set(j, temp);
                            sortedAssetTypes.set(j, tempBis);
                        }
                    }
                }
        }
        return sortedAssetTypes;
    }

    @Override
    public List<String> getAttributes(AssetType assetType) {
        List<Object[]> rawTitles = repo.getAttributesById(assetType.getType_id());
        List<String> titles = new ArrayList<>();
        for (Object[] rawAttribute : rawTitles) {
            // Assuming all attributes are strings. Add null checks if necessary.
            if (rawAttribute[0] != null) titles.add((String) rawAttribute[0]);
            if (rawAttribute[1] != null) titles.add((String) rawAttribute[1]);
            if (rawAttribute[2] != null) titles.add((String) rawAttribute[2]);
        }
        return titles;
    }

    @Override
    public void editAssetType(AssetType assetType, String username) {

        repo.updateAssetTypeFieldsById(assetType.getType_id(), assetType.getType_name(), assetType.getDescription(),
                assetType.getTypeAttribute1(), assetType.getTypeAttribute2(), assetType.getTypeAttribute3());

        Log log = new Log();
        log.setUpdateTimestamp(new Timestamp(System.currentTimeMillis()));
        log.setUser(userRepo.findByUserName(username));
        log.setUpdateDescription(
                assetType.getType_name() + " asset type was edited! Modifications are the following:\n" +
                        "Name: " + assetType.getType_name() + "\n" +
                        "Description: " + assetType.getDescription() + "\n" +
                        "Attribute1: " + assetType.getTypeAttribute1() + "\n" +
                        "Attribute2: " + assetType.getTypeAttribute2() + "\n" +
                        "Attribute3: " + assetType.getTypeAttribute3());
        logrepo.save(log);
    }

    @Override
    public void deleteAssetType(int assetTypeId, String username) {
        Log log = new Log();
        log.setUpdateTimestamp(new Timestamp(System.currentTimeMillis()));
        log.setUpdateDescription(repo.findByTypeId(assetTypeId).getType_name() + " was deleted!");
        log.setUser(userRepo.findByUserName(username));
        logrepo.save(log);

        assetrepo.eraseTypeIdFromAsset(assetTypeId);

        repo.deleteAssetTypeById(assetTypeId);
    }

    @Override
    public List<AssetType> refreshAssetType() {
        return repo.getAllAssetTypes();
    }

    @Override
    public List<AssetType> searchTypes(String searchString) {

        List<String> TypeList = repo.getAllAssetTypeNames();
        List<AssetType> compatibleList = new ArrayList<>();
        for (String type : TypeList) {
            if (searchString.equals(type)) {
                compatibleList.add(repo.findByTypeName(type));
            } else if (userService.isSimilar(searchString, type)) {
                compatibleList.add(repo.findByTypeName(type));
            }
        }
        return compatibleList;
    }

}
