package cs2815.project.service.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cs2815.project.model.Asset;
import cs2815.project.repo.AssetRepo;
import cs2815.project.service.AssetService;

@Service
public class AssetImpl implements AssetService {

    @Autowired
    private AssetRepo repo;

    @Override
    public void createAsset(Asset asset) {
        if (asset == null) {
            System.out.println("Error: Asset is null.");
            return;
        }
        repo.save(asset);
    }

}
