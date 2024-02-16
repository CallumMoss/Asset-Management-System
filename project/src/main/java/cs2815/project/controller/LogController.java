package cs2815.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cs2815.project.model.Log;
import cs2815.project.service.LogService;

import java.util.List;

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

}