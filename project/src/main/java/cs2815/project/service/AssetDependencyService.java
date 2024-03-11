package cs2815.project.service;

import java.util.List;

import cs2815.project.model.AssetDependency;

public interface AssetDependencyService {

    List<AssetDependency> getAllDependencies();

    List<AssetDependency> getParentAssets(int assetId);
}
