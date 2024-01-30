package cs2815.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import cs2815.project.model.AssetAttributeValue;
import cs2815.project.service.AssetAttributeValueService;

@RestController
@RequestMapping("/asset_attribute_values")
public class AssetAttributeValueController {

    @Autowired
    private AssetAttributeValueService assetAttributeValueService;

    @PostMapping("/createAssetAttributeValue")
    public void createAssetAttributeValue(@RequestBody AssetAttributeValue value) {
        assetAttributeValueService.createAssetAttributeValue(value);
    }
}
