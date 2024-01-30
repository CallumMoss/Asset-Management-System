package cs2815.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import cs2815.project.model.AssetTypes;
import cs2815.project.service.AssetTypesService;

@RestController
@RequestMapping("/asset_types")
public class AssetTypesController {

    @Autowired
    private AssetTypesService assetTypeService;

    @PostMapping("/createAssetType")
    public void createAssetType(@RequestBody AssetTypes type) {
        assetTypeService.createAssetType(type);
    }
}
