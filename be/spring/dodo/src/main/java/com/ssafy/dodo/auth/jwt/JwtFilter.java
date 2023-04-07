package com.ssafy.dodo.auth.jwt;


import com.ssafy.dodo.exception.ErrorCode;
import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@Slf4j
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {
    public static final String AUTHORIZATION_HEADER = "Authorization";
    private final JwtProvider jwtProvider;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        String jwt = resolveToken(httpServletRequest);
        String requestURI = httpServletRequest.getRequestURI();

        log.info("request method : {}", request.getMethod());
        log.info("request uri : {}", requestURI);
        log.info("request access token : {}" ,jwt);

        // 토큰이 정상적이면 SecurityContext에 set.
        try{
            if (StringUtils.hasText(jwt) && jwtProvider.validateToken(jwt)) {
                Authentication authentication = jwtProvider.getAuthentication(jwt);
                SecurityContextHolder.getContext().setAuthentication(authentication);
                log.info("Security Context에 '{}' 인증 정보를 저장했습니다", authentication.getName());
            }
        }catch (SignatureException | MalformedJwtException e) {
//            log.info("유효하지 않은 토큰입니다.");
            request.setAttribute("exception", ErrorCode.INVALID_TOKEN);
        }catch (ExpiredJwtException e) {
//            log.info("만료된 토큰입니다.");
            request.setAttribute("exception", ErrorCode.EXPIRED_TOKEN);
        } catch (UnsupportedJwtException e) {
//            log.info("지원되지 않는 토큰입니다.");
            request.setAttribute("exception", ErrorCode.UNSUPPORTED_TOKEN);
        } catch (JwtException e) {
//            log.info("토큰이 잘못되었습니다.");
            request.setAttribute("exception", ErrorCode.WRONG_TOKEN);
        }

        filterChain.doFilter(request, response);
    }

    // Request Header에서 토큰 정보를 꺼내오기 위한 메소드
    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);

        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")) {
            return bearerToken.substring(7);
        }

        return null;
    }
}
