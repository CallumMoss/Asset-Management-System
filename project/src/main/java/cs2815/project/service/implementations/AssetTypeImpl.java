package cs2815.project.service.Implementations;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import cs2815.project.model.AssetType;
import cs2815.project.repo.AssetTypeRepo;
import cs2815.project.service.AssetTypeService;

@Service
public class AssetTypeImpl implements AssetTypeService {

    @Autowired
    private AssetTypeRepo repo;

    @Autowired
    private UserServiceImpl userService;

    @Override
    public void createAssetType(AssetType assetType) {
        repo.save(assetType);
    }

    @Override
    public void editAssetType(AssetType assetType) {
        repo.updateAssetTypeFieldsById(assetType.getType_id(), assetType.getType_name(), assetType.getDescription());
    }

    @Override
    public void deleteAssetType(int assetTypeId) {
        repo.deleteAssetTypeById(assetTypeId);
    }

    @Override
    public List<AssetType> refreshAssetType() {
        return repo.getAllAssetTypes();
    }

    @Override
    public List<String> searchTypes(String searchString) {

        List<String> TypeList = repo.getAllAssetTypeNames();
        List<String> compatibleList = new ArrayList<>();
        for (String type : TypeList) {
            if (userService.isSimilar(searchString, type)) {
                compatibleList.add(type);
            }
        }
        return compatibleList;
    }

}
