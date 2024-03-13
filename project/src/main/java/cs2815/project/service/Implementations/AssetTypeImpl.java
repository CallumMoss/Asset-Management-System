package cs2815.project.service.Implementations;

import cs2815.project.model.AssetType;
import cs2815.project.model.Log;
import cs2815.project.repo.AssetRepo;
import cs2815.project.repo.AssetTypeRepo;
import cs2815.project.repo.LogRepo;
import cs2815.project.service.AssetTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Service
public class AssetTypeImpl implements AssetTypeService {

    @Autowired
    private AssetTypeRepo repo;

    @Autowired
    private LogRepo logrepo;

    @Autowired
    private AssetRepo assetrepo;

    @Autowired
    private UserServiceImpl userService;

    @Override
    public void createAssetType(AssetType assetType) {
        repo.save(assetType);

        Log log = new Log();
        log.setUpdateTimestamp(new Timestamp(System.currentTimeMillis()));
        log.setUpdateDescription(assetType.getType_name() + " was created!");

        logrepo.save(log);

    }
    @Override
    public void createBaseTypes() {
        createAssetType(new AssetType("Python File", "A file that contains python code for a given project."));
        createAssetType(new AssetType("Documentation", "A file that contains documentation to supply extra information about any given asset."));
        createAssetType(new AssetType("Project", "A collection of assets which outline the integral parts of a project, such as code files, relevant documentation and participants."));
        createAssetType(new AssetType("Java File", "A file that contains java code for a given project."));
    }

    @Override
    public List<AssetType> sortAlphabetically(List<AssetType> unsortedAssetTypes) {
        List<String> sortByList = new ArrayList<>();
        List<AssetType> sortedAssetTypes = unsortedAssetTypes;
        for (AssetType assetType : unsortedAssetTypes) {
            sortByList.add(assetType.getType_name());
        }
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
        return sortedAssetTypes;
    }

    @Override
    public void editAssetType(AssetType assetType) {
        repo.updateAssetTypeFieldsById(assetType.getType_id(), assetType.getType_name(), assetType.getDescription());

        Log log = new Log();
        log.setUpdateTimestamp(new Timestamp(System.currentTimeMillis()));
        log.setUpdateDescription(assetType.getType_name() + " was edited!");

        logrepo.save(log);
    }

    @Override
    public void deleteAssetType(int assetTypeId) {
        Log log = new Log();
        log.setUpdateTimestamp(new Timestamp(System.currentTimeMillis()));
        log.setUpdateDescription(repo.findByTypeId(assetTypeId).getType_name() + " was deleted!");

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
            }
            else if (userService.isSimilar(searchString, type)) {
                compatibleList.add(repo.findByTypeName(type));
            }
        }
        return compatibleList;
    }

}
