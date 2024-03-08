package cs2815.project.service.Implementations;

import cs2815.project.model.Log;
import cs2815.project.model.User;
import cs2815.project.repo.LogRepo;
import cs2815.project.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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
            if (searchString.equals(desc) || userService.isSimilar(searchString, desc)) {
                List<Log> logs = repo.getLogByDescription(desc);
                compatibleLogs.addAll(logs);
                if (!compatibleLogs.contains(logs.get(0))) {
                    compatibleLogs.addAll(logs);
                }
            }
        }
        return compatibleLogs;
    }

    @Override
    public List<Log> getUserLog() {
        List<Log> allLogs = repo.findAllOrderedByUpdateTimestampDesc();
        List<Log> compatibleLogs = new ArrayList<>();
        for (Log log : allLogs) {
            if (log.getAsset() == null) {
                compatibleLogs.add(log);
            }
        }
        return compatibleLogs;
    }

    @Override
    public List<Log> getAssetLog() {
        List<Log> allLogs = repo.findAllOrderedByUpdateTimestampDesc();
        List<Log> compatibleLogs = new ArrayList<>();
        for (Log log : allLogs) {
            if (log.getUser() == null) {
                compatibleLogs.add(log);
            }
        }
        return compatibleLogs;
    }

    @Override
    public List<Log> getLogsByAssetId(int assetId) {
        return repo.getLogByAssetId(assetId);
    }

}
