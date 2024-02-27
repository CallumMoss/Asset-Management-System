package cs2815.project.service.Implementations;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import cs2815.project.model.Log;
import cs2815.project.repo.LogRepo;
import cs2815.project.service.LogService;

@Service
public class LogServiceImpl implements LogService {

    @Autowired
    private LogRepo repo;

    @Override
    public List<Log> refreshLogs() {
        return repo.findAllOrderedByUpdateTimestampDesc();
    }

    @Override
    public List<Log> getLogsAssId(int id) {
        return repo.findLogsByAssetId(id);
    }

}
