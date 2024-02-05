package cs2815.project.repo;

import cs2815.project.model.AssetType;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface AssetTypeRepo extends JpaRepository<AssetType, String> {

}
