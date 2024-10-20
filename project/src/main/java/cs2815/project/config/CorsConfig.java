package cs2815.project.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    /*
     * @Bean
     * public CorsFilter corsFilter() {
     * UrlBasedCorsConfigurationSource source = new
     * UrlBasedCorsConfigurationSource();
     * CorsConfiguration config = new CorsConfiguration();
     * config.addAllowedOrigin("*"); // Allow all origins. You may want to configure
     * this more restrictively in
     * // production.
     * config.addAllowedHeader("*");
     * config.addAllowedMethod("*");
     * source.registerCorsConfiguration("/**", config);
     * return new CorsFilter(source);
     * }
     * 
     * @Bean
     * public PasswordEncoder passwordEncoder() {
     * return new BCryptPasswordEncoder();
     * }
     * }
     * 
     * 
     */

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true); // Important if you are sending cookies/session information
        config.addAllowedOriginPattern("http://localhost:[*]"); // Use this for specific port patterns
        // Or, use the line below to allow a specific origin
        // config.addAllowedOrigin("http://localhost:3001");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }

     /**
     * Encrypts password data protection.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}