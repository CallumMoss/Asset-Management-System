package cs2815.project.service.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cs2815.project.model.AssetAttribute;
import cs2815.project.repo.AssetAttributeRepo;
import cs2815.project.service.AssetAttributeService;

@Service
public class AssetAttributeImpl implements AssetAttributeService {

    @Autowired
    private AssetAttributeRepo repo;

    @Override
    public void createAssetAttribute(AssetAttribute assetAttribute) {
        if (assetAttribute == null) {
            System.out.println("Error: Attribute is null.");
            return;
        }
        repo.save(assetAttribute);
    }

}
