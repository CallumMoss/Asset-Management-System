package cs2815.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import cs2815.project.model.Asset;
import cs2815.project.service.AssetService;

@RestController
@RequestMapping("/assets")
public class AssetController {

    @Autowired
    private AssetService assetService;

    @PostMapping("/createAsset")
    public void createAsset(@RequestBody Asset title) {
        assetService.createAsset(title);
    }
}
