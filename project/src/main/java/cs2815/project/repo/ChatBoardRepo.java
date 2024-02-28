package cs2815.project.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import cs2815.project.model.ChatBoard;

@RepositoryRestResource
public interface ChatBoardRepo extends JpaRepository<ChatBoard, Integer> {

}
