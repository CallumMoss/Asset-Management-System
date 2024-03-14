package cs2815.project.service;

import java.util.List;

import cs2815.project.model.Log;

public interface LogService {

    List<Log> refreshLogs();

    List<Log> searchByDescription(String searchString);

    List<Log> getUserLog();

    List<Log> getAssetLog();

    List<Log> getLogsByAssetId(int assetId);
}
