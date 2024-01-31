package cs2815.project.service.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AssetTypesImpl implements AssetTypesService {

    @Autowired
    private AssetTypesRepo repo;

    @Override
    public void createAssetType(AssetTypes assetType) {
        repo.save(assetType);
    }

}
