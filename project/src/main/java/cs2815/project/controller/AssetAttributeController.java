package cs2815.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import cs2815.project.model.AssetAttribute;
import cs2815.project.service.AssetAttributeService;

@RestController
@RequestMapping("/asset_attributes")
public class AssetAttributeController {

    @Autowired
    private AssetAttributeService assetAttributeService;

    @PostMapping("/createAssetAttribute")
    public void createAssetAttribute(@RequestBody AssetAttribute title) {
        assetAttributeService.createAssetAttribute(title);
    }
}
