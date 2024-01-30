package cs2815.project.service.Implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cs2815.project.model.AssetType;
import cs2815.project.repo.AssetTypeRepo;
import cs2815.project.service.AssetTypeService;

@Service
public class AssetTypeImpl implements AssetTypeService {

    @Autowired
    private AssetTypeRepo repo;

    @Override
    public void createAssetType(AssetType assetType) {
        if (assetType == null) {
            System.out.println("Error: AssetType is null.");
            return;
        }
        repo.save(assetType);
    }

}
