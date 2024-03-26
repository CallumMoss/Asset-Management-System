package cs2815.project.service;

/*
 * Java imports:
 */
import java.util.List;

/*
 * Imports for project:
 */
import cs2815.project.model.Log;

/**
 * Interface for Logs:
 */
public interface LogService {

    //Function declarations:
    List<Log> refreshLogs();

    List<Log> searchByDescription(String searchString);

    List<Log> getUserLog();

    List<Log> getAssetLog();

    List<Log> getLogsByAssetId(int assetId);
}