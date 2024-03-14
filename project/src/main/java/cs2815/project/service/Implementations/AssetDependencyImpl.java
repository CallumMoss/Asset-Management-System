package cs2815.project.service.Implementations;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cs2815.project.model.AssetDependency;
import cs2815.project.repo.AssetDependencyRepo;
import cs2815.project.service.AssetDependencyService;

@Service
public class AssetDependencyImpl implements AssetDependencyService {

    @Autowired
    private AssetDependencyRepo assetDependencyRepo;

    @Override
    public List<AssetDependency> getAllDependencies() {
        return assetDependencyRepo.findAll();
    }

    @Override
    public List<AssetDependency> getParentAssets(int assetId) {
        return assetDependencyRepo.findParentAsset(assetId);
    }

}
