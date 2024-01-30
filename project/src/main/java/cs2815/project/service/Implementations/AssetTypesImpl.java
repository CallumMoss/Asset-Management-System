package cs2815.project.service.Implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cs2815.project.model.AssetTypes;
import cs2815.project.repo.AssetTypesRepo;
import cs2815.project.service.AssetTypesService;

@Service
public class AssetTypesImpl implements AssetTypesService {

    @Autowired
    private AssetTypesRepo repo;

    @Override
    public void createAssetType(AssetTypes assetType) {
        repo.save(assetType);
    }

}
