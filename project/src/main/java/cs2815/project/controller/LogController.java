package cs2815.project.controller;

import cs2815.project.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import cs2815.project.model.Log;
import cs2815.project.service.LogService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/logs")
public class LogController {

    @Autowired
    private LogService logService;

    @GetMapping("/refresh")
    public ResponseEntity<List<Log>> refreshLogs() {
        List<Log> logs = logService.refreshLogs();
        return ResponseEntity.ok(logs);

    }

    @PostMapping("/search")
    public ResponseEntity<List<Log>> searchLog(@RequestBody Map<String,String> searchString) {
        List<Log> compatibleLogs = logService.searchByDescription(searchString.get("searchTerm"));
        return ResponseEntity.ok(compatibleLogs);
    }

    @PostMapping("/userLog")
    public ResponseEntity<List<Log>> userLog() {
        List<Log> compatibleLogs = logService.getUserLog();
        return ResponseEntity.ok(compatibleLogs);
    }

    @PostMapping("/assetLog")
    public ResponseEntity<List<Log>> assetLog() {
        List<Log> compatibleLogs = logService.getAssetLog();
        return ResponseEntity.ok(compatibleLogs);
    }
}