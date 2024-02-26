package cs2815.project.service.Implementations;

import java.util.ArrayList;
import java.util.List;

import cs2815.project.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import cs2815.project.model.Log;
import cs2815.project.repo.LogRepo;
import cs2815.project.service.LogService;

@Service
public class LogServiceImpl implements LogService {

    @Autowired
    private LogRepo repo;

    @Autowired
    private UserServiceImpl userService;

    @Override
    public List<Log> refreshLogs() {
        return repo.findAllOrderedByUpdateTimestampDesc();
    }

    @Override
    public List<Log> searchByDescription(String searchString) {
        List<String> descriptionList = repo.findAllDescriptions();
        List<Log> compatibleLogs = new ArrayList<>();
        for (String desc : descriptionList) {
            if (userService.isSimilar(searchString, desc)) {
                compatibleLogs.add(repo.getLogByDescription(desc));
            }
        }
        return compatibleLogs;
    }

}
