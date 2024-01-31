package cs2815.project.repo;

import cs2815.project.model.AssetAttributeValue;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface AssetAttributeValueRepo extends JpaRepository<AssetAttributeValue, Integer> { // Integer being the type
                                                                                               // of the primary key

    // this query doesnt work, just here as a placeholder

}
