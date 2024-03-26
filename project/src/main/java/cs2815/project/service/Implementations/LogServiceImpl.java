package cs2815.project.service.Implementations;

/*
 * Imports for project:
 */
import cs2815.project.model.Log;
import cs2815.project.repo.LogRepo;
import cs2815.project.service.LogService;

/*
 * Springboot Imports:
 */
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/*
 * Java imports:
 */
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Implementation of the {@link cs2815.project.service.LogService} interface.
 * Provides methods for managing logs including refreshing, searching, and retrieving logs.
 */
@Service
public class LogServiceImpl implements LogService {

    @Autowired
    private LogRepo repo;

    @Autowired
    private UserServiceImpl userService;

    /**
     * Refreshes the list of logs, ordered by the update timestamp in descending order.
     * @return The refreshed list of logs.
     */
    @Override
    public List<Log> refreshLogs() {
        return repo.findAllOrderedByUpdateTimestampDesc();
    }

    /**
     * Searches for logs based on given description.
     * @param searchString The description to search for.
     * @return The list of logs that match the search criteria.
     */
    @Override
    public List<Log> searchByDescription(String searchString) {
        List<Log> descriptionList = repo.findAllOrderedByUpdateTimestampDesc();
        List<Log> compatibleLogs = new ArrayList<>();
        List<Log> logs;
        String desc;
        for (Log log : descriptionList) {
            desc = log.getUpdateDescription();
            if (userService.isSimilar(searchString, desc)) {
                logs = repo.getLogByDescription(desc);
                compatibleLogs.addAll(logs);
                Collections.reverse(compatibleLogs); // Help display it in order.
                break;
            }
        }
        return compatibleLogs;
    }

    /**
     * Retrieves logs related to user actions.
     * @return The list of logs related to user actions.
     */
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

    /**
     * Retrieves logs related to asset actions.
     * @return The list of logs related to asset actions.
     */
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

    /**
     * Retrieves logs associated with specific asset ID.
     * @param assetId The ID of the asset.
     * @return The list of logs associated with the specified asset ID.
     */
    @Override
    public List<Log> getLogsByAssetId(int assetId) {
        return repo.getLogByAssetId(assetId);
    }
}