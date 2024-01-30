package cs2815.project.service.Implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cs2815.project.model.AssetAttributeValue;
import cs2815.project.repo.AssetAttributeValueRepo;
import cs2815.project.service.AssetAttributeValueService;

@Service
public class AssetAttributeValueImpl implements AssetAttributeValueService {

    @Autowired
    private AssetAttributeValueRepo repo;

    @Override
    public void createAssetAttributeValue(AssetAttributeValue assetAttributeValue) {
        if (assetAttributeValue == null) {
            System.out.println("Error: AttributeValue is null.");
            return;
        }
        repo.save(assetAttributeValue);
    }

}
