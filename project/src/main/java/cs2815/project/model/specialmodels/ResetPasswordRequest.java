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
public class ResetPasswordRequest {
    //Private fields:
    private String userName;
    private String newPassword;
}