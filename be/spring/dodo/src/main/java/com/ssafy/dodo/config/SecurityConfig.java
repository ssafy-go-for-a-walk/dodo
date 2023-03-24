package com.ssafy.dodo.config;

import com.ssafy.dodo.auth.CustomOAuth2UserService;
import com.ssafy.dodo.auth.OAuth2LoginSuccessHandler;
import com.ssafy.dodo.auth.jwt.JwtAccessDeniedHandler;
import com.ssafy.dodo.auth.jwt.JwtAuthenticationEntryPoint;
import com.ssafy.dodo.auth.jwt.JwtFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@RequiredArgsConstructor
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;
    private final CustomOAuth2UserService customOAuth2UserService;
    private final JwtFilter jwtFilter;
//    private final JwtExceptionFilter jwtExceptionFilter;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http
                // CORS 허용 설정
                .cors()

                .and()
                // CSRF : 정상적인 사용자가 의도치 않은 위조 요청을 보내는 것
                // REST API는 stateless하여 서버에 인증 정보를 저장하지 않고 요청에 인증정보를 포함시키 때문에 불필요
                .csrf().disable()
                .httpBasic().disable()
                .formLogin().disable() // FormLogin 사용하지않음

                // URL 권한 설정
                .authorizeRequests()
                .antMatchers(HttpMethod.GET, "/api/auth/hello").authenticated()
                .anyRequest().permitAll()

                // JWT 설정
                .and()
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
//                .addFilterBefore(jwtExceptionFilter, JwtFilter.class)

                // 예외 설정
                .exceptionHandling()
                // 인증이 되지 않은 유저가 요청 시 401
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                // 필요한 권한없이 요청 시 403
                .accessDeniedHandler(jwtAccessDeniedHandler)

                // 세션을 사용하지 않으므로 STATELESS로 설정
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                // 소셜 로그인 설정
                .and()
                .oauth2Login()
                .successHandler(oAuth2LoginSuccessHandler)// 동의하고 계속하기를 눌렀을때,
                .userInfoEndpoint()
                .userService(customOAuth2UserService);// userService 설정

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource(){


        CorsConfiguration config = new CorsConfiguration();

        config.setAllowCredentials(true);
        config.addAllowedOriginPattern("*"); // 허용할 URL
        config.addAllowedHeader("*"); // 허용할 Header
        config.addAllowedMethod("*"); // 허용할 Http Method
        config.addExposedHeader("*");


        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }
}
