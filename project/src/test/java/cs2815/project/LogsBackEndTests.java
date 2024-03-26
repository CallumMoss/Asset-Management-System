package cs2815.project;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Assertions;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import cs2815.project.controller.LogController;
import cs2815.project.model.Asset;
import cs2815.project.model.Log;
import cs2815.project.repo.LogRepo;
import cs2815.project.service.Implementations.LogServiceImpl;

// Tests are designed for the base database
@SpringBootTest
class LogsBackEndTests {

    @Autowired
    private LogRepo lr;

    @Autowired
    private LogController lc;

    @Autowired
    private LogServiceImpl lsi;

    @Test
    void testGetDescription() {
        List<Log> logs = new ArrayList<Log>();
        Log log1 = new Log();
        log1.setUpdateDescription("Test");
        logs.add(log1);
        assertEquals("Test", logs.get(0).getUpdateDescription());
    }

    @Test
    void testGetAsset() {
        List<Log> logs = new ArrayList<Log>();
        Log log1 = new Log();
        Asset asset = new Asset();
        log1.setAsset(asset);
        logs.add(log1);
        assertEquals(asset, logs.get(0).getAsset());
    }
    // Testing incorrect cases ()
}
