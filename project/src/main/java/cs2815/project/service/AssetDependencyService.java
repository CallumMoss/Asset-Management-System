package cs2815.project.service;

/*
 * Java imports:
 */
import java.util.List;

/*
 * Imports for project:
 */
import cs2815.project.model.AssetDependency;

/**
 * Interface for Asset dependencies.
 */
public interface AssetDependencyService {

    //Function declarations:
    List<AssetDependency> getAllDependencies();

    List<AssetDependency> getParentAssets(int assetId);

    void deleteDependency(int dependencyId, String username);

    List<AssetDependency> searchParents(String searchString);

    List<AssetDependency> searchChild(String searchString);
}