package cs2815.project.service.Implementations;

/*
 * Java imports:
 */
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/*
 * Springboot imports:
 */
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/*
 * Imports for project:
 */
import cs2815.project.model.AssetDependency;
import cs2815.project.model.Log;
import cs2815.project.repo.AssetDependencyRepo;
import cs2815.project.repo.UserRepo;
import cs2815.project.service.AssetDependencyService;

/**
 * Implementation of AssetDependencyService.
 * Provides methods to interact with AssetDependency entities.
 */
@Service
public class AssetDependencyImpl implements AssetDependencyService {

    //Private fields:
    @Autowired
    private AssetDependencyRepo assetDependencyRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private UserServiceImpl userService;

    /**
     * Retrieve all asset dependencies.
     * @return List of all AssetDependency objects.
     */
    @Override
    public List<AssetDependency> getAllDependencies() {
        return assetDependencyRepo.findAll();
    }

    /**
     * Retrieve parent assets of a given asset.
     * @param assetId The ID of the asset.
     * @return List of parent AssetDependency objects.
     */
    @Override
    public List<AssetDependency> getParentAssets(int assetId) {
        return assetDependencyRepo.findParentAsset(assetId);
    }

    /**
     * Delete a dependency.
     * @param dependencyId The ID of the dependency to delete.
     * @param username The username of the user performing the deletion.
     */
    @Override
    public void deleteDependency(int dependencyId, String username) {

        Optional<AssetDependency> optionalDependency = assetDependencyRepo.findById(dependencyId);
        AssetDependency dependency = optionalDependency.get();

        Log log = new Log();
        log.setUpdateTimestamp(new Timestamp(System.currentTimeMillis()));
        log.setUser(userRepo.findByUserName(username));
        log.setUpdateDescription(dependency.getAsset().getTitle() + " and " + dependency.getDependent().getTitle()
                + " dependency was deleted!");

        assetDependencyRepo.delete(dependency);
    }

    /**
     * Searches for parent dependencies based on search string.
     * @param searchString The search string.
     * @return List of compatible AssetDependency objects.
     */
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

    /**
     * Search for child dependencies based on search string.
     * @param searchString The search string.
     * @return List of compatible AssetDependency objects.
     */
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