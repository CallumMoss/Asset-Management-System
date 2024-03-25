package cs2815.project.repo;

/*
 * Imports for project:
 */
import cs2815.project.model.AssetType;

/*
 * Springboot imports:
 */
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

/*
 * Java imports:
 */
import java.util.List;

/**
 * Interface for Asset Type repository.
 */
public interface AssetTypeRepo extends JpaRepository<AssetType, Integer> {

    /**
     * Retrieves all asset types.
     *
     * @return List of all asset types.
     */
    @Query("SELECT at FROM AssetType at")
    List<AssetType> getAllAssetTypes();

    /**
     * Retrieves an asset type by its type name.
     *
     * @param typeName The name of the asset type to retrieve.
     * @return AssetType with the specified type name.
     */
    @Query("SELECT at FROM AssetType at WHERE at.type_name = :typeName")
    AssetType findByTypeName(@Param("typeName") String typeName);

    /**
     * Retrieves an asset type by its type ID.
     *
     * @param typeId The ID of the asset type to retrieve.
     * @return AssetType with the specified type ID.
     */
    @Query("SELECT at FROM AssetType at WHERE at.type_id = :typeId")
    AssetType findByTypeId(@Param("typeId") int typeId);

    /**
     * Retrieves names of all asset types.
     *
     * @return List of names of all asset types.
     */
    @Query("SELECT at.type_name FROM AssetType at")
    List<String> getAllAssetTypeNames();

    /**
     * Retrieves attributes of an asset type by its ID.
     *
     * @param typeId The ID of the asset type to retrieve attributes for.
     * @return List of attributes of the asset type with the specified ID.
     */
    @Query("SELECT at.typeAttribute1, at.typeAttribute2, at.typeAttribute3 FROM AssetType at WHERE at.type_id = :typeId")
    List<String> getAttributesById(@Param("typeId") int typeId);

    /**
     * Deletes an asset type by its ID.
     *
     * @param assetTypeId The ID of the asset type to delete.
     */
    @Modifying
    @Transactional
    @Query("DELETE FROM AssetType at WHERE at.type_id = :assetTypeId")
    void deleteAssetTypeById(@Param("assetTypeId") int assetTypeId);

        /**
        * Updates fields of an asset type by its ID.
        *
        * @param assetTypeId    The ID of the asset type to update.
        * @param newTypeName    The new name for the asset type.
        * @param newDescription The new description for the asset type.
        */
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