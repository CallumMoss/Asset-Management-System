package cs2815.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import cs2815.project.model.AssetType;
import cs2815.project.service.AssetTypeService;

@RestController
@RequestMapping("/asset_types")
public class AssetTypeController {

    @Autowired
    private AssetTypeService assetTypeService;

    @PostMapping("/createAssetType")
    public void createAssetType(@RequestBody AssetType type) {
        assetTypeService.createAssetType(type);
    }
}
