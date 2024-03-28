package cs2815.project;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import cs2815.project.model.Asset;
import cs2815.project.model.Log;

// Tests are designed for the base database
@SpringBootTest
class LogsBackEndTests {

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
}
