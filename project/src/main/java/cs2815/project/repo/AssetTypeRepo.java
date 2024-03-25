package cs2815.project.repo;

import cs2815.project.model.AssetType;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface AssetTypeRepo extends JpaRepository<AssetType, Integer> {

        @Query("SELECT at FROM AssetType at")
        List<AssetType> getAllAssetTypes();

        @Query("SELECT at FROM AssetType at WHERE at.type_name = :typeName")
        AssetType findByTypeName(@Param("typeName") String typeName);

        @Query("SELECT at FROM AssetType at WHERE at.type_id = :typeId")
        AssetType findByTypeId(@Param("typeId") int typeId);

        @Query("SELECT at.type_name FROM AssetType at")
        List<String> getAllAssetTypeNames();

        @Query("SELECT at.typeAttribute1, at.typeAttribute2, at.typeAttribute3 FROM AssetType at WHERE at.type_id = :typeId")
        List<Object[]> getAttributesById(@Param("typeId") int typeId);

        @Modifying
        @Transactional
        @Query("DELETE FROM AssetType at WHERE at.type_id = :assetTypeId")
        void deleteAssetTypeById(@Param("assetTypeId") int assetTypeId);

        @Modifying
        @Transactional
        @Query("UPDATE AssetType at SET at.type_name = :newTypeName, at.description = :newDescription, at.typeAttribute1 = :newAttribute1, at.typeAttribute2 = :newAttribute2, at.typeAttribute3 = :newAttribute3 WHERE at.type_id = :assetTypeId")
        void updateAssetTypeFieldsById(@Param("assetTypeId") int assetTypeId,
                        @Param("newTypeName") String newTypeName,
                        @Param("newDescription") String newDescription,
                        @Param("newAttribute1") String newAttribute1,
                        @Param("newAttribute2") String newAttribute2,
                        @Param("newAttribute3") String newAttribute3);

}
