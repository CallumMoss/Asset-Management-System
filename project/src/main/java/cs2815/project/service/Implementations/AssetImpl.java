package cs2815.project.service.Implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cs2815.project.model.Asset;
import cs2815.project.repo.AssetRepo;
import cs2815.project.service.AssetService;

@Service
public class AssetImpl implements AssetService {

    @Autowired
    private AssetRepo repo;

    @Transactional
    public void createAsset(Asset asset, Set<String> languageNames) {
        // Save the asset
        Asset savedAsset = assetRepo.save(asset);

        // Associate languages with the asset
        for (String languageName : languageNames) {
            assetRepo.addLanguageToAsset(savedAsset.getAsset_id(), languageName);
        }
    }

}
