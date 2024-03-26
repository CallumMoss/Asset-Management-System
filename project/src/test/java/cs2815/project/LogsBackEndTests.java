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

    // Testing working cases
    @Test
    void test1() {
        // Testing if we can get all logs from the database.
        List<Log> logs = lsi.refreshLogs();
    
        // Creating Log objects and adding them to the array
        List<Log> expected_logs = new ArrayList<Log>();
        expected_logs.add(new Log());
        expected_logs.add(new Log());
        expected_logs.add(new Log());
        
        // Compare the contents of the two lists
        for (int i = 0; i < 4; i++) {
            assert(logs.get(i).equals(expected_logs.get(i)));
        }
    }
    // Testing incorrect cases ()
}
