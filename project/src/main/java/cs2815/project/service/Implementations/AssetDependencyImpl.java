package cs2815.project.service.Implementations;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import cs2815.project.model.Asset;
import cs2815.project.service.AssetService;
import cs2815.project.service.UserService;
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

    @Autowired
    private UserServiceImpl userService;

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

    @Override
    public List<AssetDependency> searchParents(String searchString) {
        List<String> dependencyNames = assetDependencyRepo.getAllParentNames();
        List<AssetDependency> compatibleDependencies = new ArrayList<>();
        for (String name : dependencyNames) {
            if (searchString.equals(name) || userService.isSimilar(searchString, name)) {
                List<AssetDependency> assetDependencies = assetDependencyRepo.findParentByTitle(name);
                if (!compatibleDependencies.contains(assetDependencies.get(0))) {
                    compatibleDependencies.addAll(assetDependencies);
                }
            }
        }
        return compatibleDependencies;
    }

    @Override
    public List<AssetDependency> searchChild(String searchString) {
        List<String> dependencyNames = assetDependencyRepo.getAllChildNames();
        List<AssetDependency> compatibleDependencies = new ArrayList<>();
        for (String name : dependencyNames) {
            if (searchString.equals(name) || userService.isSimilar(searchString, name)) {
                List<AssetDependency> assetDependencies = assetDependencyRepo.findChildByTitle(name);
                if (!compatibleDependencies.contains(assetDependencies.get(0))) {
                    compatibleDependencies.addAll(assetDependencies);
                }
            }
        }
        return compatibleDependencies;
    }

}
