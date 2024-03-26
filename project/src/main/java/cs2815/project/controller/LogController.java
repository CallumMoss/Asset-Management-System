package cs2815.project.controller;

/*
 * Springboot imports:
 */
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/*
 * Imports for project:
 */
import cs2815.project.model.Log;
import cs2815.project.service.LogService;

/*
 * Java imports:
 */
import java.util.List;
import java.util.Map;

/**
 * Class for all actions involving Logs.
 */
@RestController
@RequestMapping("/logs")
public class LogController {

    //Private fields:
    @Autowired
    private LogService logService;

    /**
     * Function to respond to use of refresh button.
     */
    @GetMapping("/refresh")
    public ResponseEntity<List<Log>> refreshLogs() {
        List<Log> logs = logService.refreshLogs();
        return ResponseEntity.ok(logs);
    }

     /*
     * Function to get logs according to assetID.
     */
    @GetMapping("/{asset_id}")
    public ResponseEntity<List<Log>> getLogsByAssetId(@PathVariable int asset_id) {
        List<Log> logs = logService.getLogsByAssetId(asset_id);
        return ResponseEntity.ok(logs);
    }

    /*
     * Function to respond to use of search.
     */
    @PostMapping("/search")
    public ResponseEntity<List<Log>> searchLog(@RequestBody Map<String,String> searchString) {
        List<Log> compatibleLogs = logService.searchByDescription(searchString.get("searchTerm"));
        return ResponseEntity.ok(compatibleLogs);
    }

    /*
     * Function to respond to getting logs by user.
     */
    @PostMapping("/userLog")
    public ResponseEntity<List<Log>> userLog() {
        List<Log> compatibleLogs = logService.getUserLog();
        return ResponseEntity.ok(compatibleLogs);
    }

    /*Function to get logs for specified asset. */
    @PostMapping("/assetLog")
    public ResponseEntity<List<Log>> assetLog() {
        List<Log> compatibleLogs = logService.getAssetLog();
        return ResponseEntity.ok(compatibleLogs);
    }
}