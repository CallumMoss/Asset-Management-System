package cs2815.project.repo;

import cs2815.project.model.AssetAttribute;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface AssetAttributeRepo extends JpaRepository<AssetAttribute, Integer> { // Integer being the type of the
                                                                                     // primary key

}
