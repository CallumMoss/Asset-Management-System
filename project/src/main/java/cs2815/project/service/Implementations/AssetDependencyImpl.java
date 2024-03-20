package cs2815.project.service.Implementations;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cs2815.project.model.AssetDependency;
import cs2815.project.model.Log;
import cs2815.project.repo.AssetDependencyRepo;
import cs2815.project.repo.UserRepo;
import cs2815.project.service.AssetDependencyService;

@Service
public class AssetDependencyImpl implements AssetDependencyService {

    @Autowired
    private AssetDependencyRepo assetDependencyRepo;

    @Autowired
    private UserRepo userRepo;

    @Override
    public List<AssetDependency> getAllDependencies() {
        return assetDependencyRepo.findAll();
    }

    @Override
    public List<AssetDependency> getParentAssets(int assetId) {
        return assetDependencyRepo.findParentAsset(assetId);
    }

    @Override
    public void deleteDependency(int dependencyId, String username) {

        Optional<AssetDependency> optionalDependency = assetDependencyRepo.findById(dependencyId);
        AssetDependency dependency = optionalDependency.get();

        Log log = new Log();
        log.setUpdateTimestamp(new Timestamp(System.currentTimeMillis()));
        log.setUser(userRepo.findByUserName(username));
        log.setUpdateDescription(dependency.getAsset().getTitle() + " and " + dependency.getDependent().getTitle()
                + "dependency was deleted!");

        assetDependencyRepo.delete(dependency);
    }

}
