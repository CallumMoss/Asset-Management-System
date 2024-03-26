package cs2815.project.model.specialmodels;

/*
 * Imports:
 */
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    //Private fields:
    private boolean authenticated;
    private String userRole;
}